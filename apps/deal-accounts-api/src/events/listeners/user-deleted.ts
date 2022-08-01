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

  handleEachMessage = async (data: IUserDeletedEvent['data']) => {
    console.log('Event data ', data);

    try {
      data.forEach(async (msg) => {
        const account = await Account.findOne({ _id: msg.id });

        if (account) {
          const eventData = { email: msg.email, userId: account._id };

          await account.delete();

          new AccountDeletedPublisher(kafkaService.client).publish([eventData]);
        }
      });
    } catch (error) {
      return error;
    }
  };
}
