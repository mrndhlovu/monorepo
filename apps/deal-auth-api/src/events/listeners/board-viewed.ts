import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IBoardViewedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardViewedConsumer extends Consumer<IBoardViewedEvent> {
  readonly topic: KafkaTopics.BoardViewed = KafkaTopics.BoardViewed;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async handleEachMessage(data: IBoardViewedEvent['data']) {
    data.forEach(async (msg) => {
      const user = await User.findOneAndUpdate(
        { _id: msg.userId },
        { $push: { viewedRecent: { $each: [msg.boardId] } } }
      );

      if (user) {
        await user!?.save();
      }
    });
  }
}
