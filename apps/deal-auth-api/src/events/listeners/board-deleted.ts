import {
  IBoardDeletedEvent,
  Consumer,
  queueGroupNames,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardDeletedConsumer extends Consumer<IBoardDeletedEvent> {
  readonly topic: KafkaTopics.BoardDeleted = KafkaTopics.BoardDeleted;
  queueGroupName = queueGroupNames.BOARDS_QUEUE_GROUP;

  async handleEachMessage(data: IBoardDeletedEvent['data']) {
    console.log('Event data ', data);

    data.forEach(async (msg) => {
      const user = await User.findOneAndUpdate(
        { _id: msg.ownerId },
        { $pull: { boardIds: msg.id } }
      );

      if (!user) throw new Error('User not found');
    });
  }
}
