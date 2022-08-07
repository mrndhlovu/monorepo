import {
  AccountStatus,
  IUserVerifiedEvent,
  Consumer,
  CONSUMER_GROUPS,
  KafkaTopics,
  kafkaService,
  IAccountFields,
} from '@loxodonta/deal-apis/shared-utils';
import { accountService } from '../../services';
import { AccountUpdatedProducer } from '../producers';

import Account from '../../models/Account';
import Notification from '../../models/Notification';

export class UserVerifiedConsumer extends Consumer<IUserVerifiedEvent> {
  readonly topic: KafkaTopics.UserVerified = KafkaTopics.UserVerified;
  groupId = CONSUMER_GROUPS.ACCOUNT;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IUserVerifiedEvent['data'];
    console.log('NEW EVENT====>', data);
    try {
      const account = new Account({
        userId: data.id,
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
      const eventData = accountService.getEventData(account) as IAccountFields;

      await new AccountUpdatedProducer(kafkaService.client).publish(eventData);
    } catch (error) {
      console.log(error.message);
    }
  }
}
