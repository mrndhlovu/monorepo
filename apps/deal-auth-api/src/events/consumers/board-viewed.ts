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

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IBoardViewedEvent['data']>(message.value);

    const user = await User.findOneAndUpdate(
      { _id: data.userId },
      { $push: { viewedRecent: { $each: [data.boardId] } } }
    );

    if (user) {
      await user!?.save();
    }
  }
}
