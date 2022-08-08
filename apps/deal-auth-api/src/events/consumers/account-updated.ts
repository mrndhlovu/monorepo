import {
  Consumer,
  KAFKA_TOPICS,
  CONSUMER_GROUPS,
  IAccountUpdatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class AccountUpdatedConsumer extends Consumer<IAccountUpdatedEvent> {
  readonly topic: KAFKA_TOPICS.AccountUpdated = KAFKA_TOPICS.AccountUpdated;
  groupId = CONSUMER_GROUPS.AUTH;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IAccountUpdatedEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.userId },
      {
        $set: {
          account: { ...data },
        },
      }
    );

    await user!?.save();
  }
}
