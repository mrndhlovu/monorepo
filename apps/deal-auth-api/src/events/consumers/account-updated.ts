import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IAccountUpdatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class AccountUpdatedConsumer extends Consumer<IAccountUpdatedEvent> {
  readonly topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IAccountUpdatedEvent['data']>(
      message.value
    );
    console.log('Event data ', data, message.value);

    const user = await User.findOneAndUpdate(
      { _id: data.id },
      {
        $set: {
          account: { ...data },
        },
      }
    );

    await user!?.save();
  }
}
