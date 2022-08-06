import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  INewActionEvent,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import { User } from '../../models/User';
import { AuthedActionPublisher } from '../producers/authed-action';

export class NewActionConsumer extends Consumer<INewActionEvent> {
  readonly topic: KafkaTopics.NewAction = KafkaTopics.NewAction;
  queueGroupName = queueGroupNames.AUTH_ACTION_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<INewActionEvent['data']>(message.value);
    const user = await User.findById(data.userId);

    if (user) {
      new AuthedActionPublisher(kafkaService.client).publish({
        ...data,
        user: {
          id: user._id,
          initials: user.initials!,
          username: user?.username,
          fullName: user?.firstName
            ? `${user?.firstName} ${user?.lastName}`
            : ``,
        },
      } as any);
    }
  }
}
