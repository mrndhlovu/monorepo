import {
  IBoardCreatedEvent,
  Consumer,
  KafkaTopics,
  CONSUMER_GROUPS,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class BoardCreatedConsumer extends Consumer<IBoardCreatedEvent> {
  readonly topic: KafkaTopics.BoardCreated = KafkaTopics.BoardCreated;
  groupId = CONSUMER_GROUPS.BOARDS;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IBoardCreatedEvent['data'];

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      { $push: { boardIds: data.id } }
    );

    await user!?.save();
  }
}
