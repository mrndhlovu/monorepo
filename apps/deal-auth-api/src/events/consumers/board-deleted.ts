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

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IBoardDeletedEvent['data']>(message.value);
    console.log('Event data ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      { $pull: { boardIds: data.id } }
    );

    if (!user) throw new Error('User not found');
  }
}
