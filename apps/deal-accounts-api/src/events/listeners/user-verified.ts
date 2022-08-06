import { Message } from 'node-nats-streaming';
import {
  AccountStatus,
  IUserVerifiedEvent,
  Consumer,
  queueGroupNames,
  KafkaTopics,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';
import { accountService } from '../../services';
import { AccountUpdatedPublisher } from '../publishers';

import Account from '../../models/Account';
import Notification from '../../models/Notification';

export class UserVerifiedConsumer extends Consumer<IUserVerifiedEvent> {
  readonly topic: KafkaTopics.UserVerified = KafkaTopics.UserVerified;
  queueGroupName = queueGroupNames.ACCOUNT_QUEUE_GROUP;

  handleEachMessage = async ({ message }) => {
    const data = this.serialiseData<IUserVerifiedEvent['data']>(message.value);
    console.log('Event data >>', data, message);

    const account = new Account({
      _id: data.id,
      status: AccountStatus.Active,
      email: data.email,
      isVerified: data.verified,
    });

    const notification = new Notification({
      isRead: false,
      body: 'New account created successfully',
      subject: 'New account created successfully',
      title: 'New account created successfully',
      user: { id: data.id },
      actionKey: 'new:user',
    });

    await account.save();
    await notification.save();
    const eventData = accountService.getEventData(account);

    new AccountUpdatedPublisher(kafkaService.client).publish(eventData);
  };
}
