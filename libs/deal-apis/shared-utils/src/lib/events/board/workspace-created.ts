import { KafkaTopics } from '../../types';

export interface IWorkspaceCreatedEvent {
  topic: KafkaTopics.WorkspaceCreated;
  data: {
    id: string;
    ownerId: string;
  };
}

export interface IWorkspaceUpdatedEvent {
  topic: KafkaTopics.WorkspaceUpdated;
  data: {
    id: string;
    ownerId: string;
    data?: { [key: string]: any };
  };
}
