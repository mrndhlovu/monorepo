import {
  IBoardDeletedEvent,
  Consumer,
  CONSUMER_GROUPS,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardDeletedConsumer extends Consumer<IBoardDeletedEvent> {
  readonly topic: KAFKA_TOPICS.BoardDeleted = KAFKA_TOPICS.BoardDeleted;
  groupId = CONSUMER_GROUPS.BOARDS;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IBoardDeletedEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      { $pull: { boardIds: data.id } }
    );

    if (!user) throw new Error('User not found');
  }
}
