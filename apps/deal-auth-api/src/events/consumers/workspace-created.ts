import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IWorkspaceCreatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class WorkspaceCreatedConsumer extends Consumer<IWorkspaceCreatedEvent> {
  readonly topic: KafkaTopics.WorkspaceCreated = KafkaTopics.WorkspaceCreated;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IWorkspaceCreatedEvent['data']>(
      message.value
    );

    console.log('Event data ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      {
        $push: {
          workspaces: data.id,
        },
      }
    );

    await user!?.save();
  }
}
