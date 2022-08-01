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

  async handleEachMessage(data: IWorkspaceCreatedEvent['data']) {
    console.log('Event data ', data);

    data.forEach(async (msg) => {
      const user = await User.findOneAndUpdate(
        { _id: msg.ownerId },
        {
          $push: {
            workspaces: msg.id,
          },
        }
      );

      await user!?.save();
    });
  }
}
