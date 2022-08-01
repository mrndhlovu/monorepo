import {
  IBoardCreatedEvent,
  Consumer,
  KafkaTopics,
  queueGroupNames,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardCreatedConsumer extends Consumer<IBoardCreatedEvent> {
  readonly topic: KafkaTopics.BoardCreated = KafkaTopics.BoardCreated;
  queueGroupName = queueGroupNames.BOARDS_QUEUE_GROUP;

  async handleEachMessage(data: IBoardCreatedEvent['data']) {
    console.log('Event data ', data);

    data.forEach(async (msg) => {
      const user = await User.findOneAndUpdate(
        { _id: msg.ownerId },
        { $push: { boardIds: msg.id } }
      );

      await user!?.save();
    });
  }
}
