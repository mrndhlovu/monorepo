import {
  IUserDeletedEvent,
  Consumer,
  queueGroupNames,
  KafkaTopics,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';
import Account from '../../models/Account';
import { AccountDeletedPublisher } from '../publishers';

export class UserDeletedConsumer extends Consumer<IUserDeletedEvent> {
  readonly topic: KafkaTopics.UserDeleted = KafkaTopics.UserDeleted;
  queueGroupName = queueGroupNames.ACCOUNT_QUEUE_GROUP;

  handleEachMessage = async ({ message }) => {
    const data = this.serialiseData<IUserDeletedEvent['data']>(message.value);
    console.log('Event data ', data);

    try {
      const account = await Account.findOne({ _id: data.id });

      if (account) {
        const eventData = { email: data.email, userId: account._id };

        await account.delete();

        new AccountDeletedPublisher(kafkaService.client).publish(eventData);
      }
    } catch (error) {
      return error;
    }
  };
}
