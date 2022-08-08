import { KAFKA_TOPICS } from '../../types';

export interface IWorkspaceCreatedEvent {
  topic: KAFKA_TOPICS.WorkspaceCreated;
  data: {
    id: string;
    ownerId: string;
  };
}

export interface IWorkspaceUpdatedEvent {
  topic: KAFKA_TOPICS.WorkspaceUpdated;
  data: {
    id: string;
    ownerId: string;
    data?: { [key: string]: any };
  };
}
