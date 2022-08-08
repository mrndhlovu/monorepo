import { KAFKA_TOPICS } from '../../types';

export interface IListCreatedEvent {
  topic: KAFKA_TOPICS.ListCreated;
  data: {
    id: string;
    boardId: string;
  };
}
