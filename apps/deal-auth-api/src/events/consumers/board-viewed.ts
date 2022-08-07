import {
  Consumer,
  KafkaTopics,
  CONSUMER_GROUPS,
  IBoardViewedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardViewedConsumer extends Consumer<IBoardViewedEvent> {
  readonly topic: KafkaTopics.BoardViewed = KafkaTopics.BoardViewed;
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
