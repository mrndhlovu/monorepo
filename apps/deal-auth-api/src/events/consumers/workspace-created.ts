import {
  Consumer,
  KAFKA_TOPICS,
  CONSUMER_GROUPS,
  IWorkspaceCreatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { User } from '../../models/User';

export class WorkspaceCreatedConsumer extends Consumer<IWorkspaceCreatedEvent> {
  readonly topic: KAFKA_TOPICS.WorkspaceCreated = KAFKA_TOPICS.WorkspaceCreated;
  groupId = CONSUMER_GROUPS.AUTH;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IWorkspaceCreatedEvent['data'];

    console.log('EVENT RECEIVED====> ', data);

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
