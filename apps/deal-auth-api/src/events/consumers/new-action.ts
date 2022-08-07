import {
  Consumer,
  KafkaTopics,
  CONSUMER_GROUPS,
  INewActionEvent,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import { User } from '../../models/User';
import { AuthedActionProducer } from '../producers/authed-action';

export class NewActionConsumer extends Consumer<INewActionEvent> {
  readonly topic: KafkaTopics.NewAction = KafkaTopics.NewAction;
  groupId = CONSUMER_GROUPS.AUTH_ACTION;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as INewActionEvent['data'];
    const user = await User.findById(data.userId);

    if (user) {
      await new AuthedActionProducer(kafkaService.client).publish({
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
