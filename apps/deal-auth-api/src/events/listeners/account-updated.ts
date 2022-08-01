import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IAccountUpdatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class AccountUpdatedConsumer extends Consumer<IAccountUpdatedEvent> {
  readonly topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async handleEachMessage(data: IAccountUpdatedEvent['data']) {
    console.log('Event data ', data);

    data.forEach(async (msg) => {
      const user = await User.findOneAndUpdate(
        { _id: msg.id },
        {
          $set: {
            account: { ...msg },
          },
        }
      );

      await user!?.save();
    });
  }
}
