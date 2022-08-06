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

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IBoardCreatedEvent['data']>(message.value);
    console.log('Event data ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      { $push: { boardIds: data.id } }
    );

    await user!?.save();
  }
}
