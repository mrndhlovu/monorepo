import {
  Consumer,
  KAFKA_TOPICS,
  CONSUMER_GROUPS,
  IBoardViewedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardViewedConsumer extends Consumer<IBoardViewedEvent> {
  readonly topic: KAFKA_TOPICS.BoardViewed = KAFKA_TOPICS.BoardViewed;
  groupId = CONSUMER_GROUPS.AUTH;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IBoardViewedEvent['data'];

    const user = await User.findOneAndUpdate(
      { _id: data.userId },
      { $push: { viewedRecent: { $each: [data.boardId] } } }
    );

    if (user) {
      await user!?.save();
    }
  }
}
