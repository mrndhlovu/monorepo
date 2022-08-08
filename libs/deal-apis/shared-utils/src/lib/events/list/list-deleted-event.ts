import { KAFKA_TOPICS } from '../../types';

export interface IListDeletedEvent {
  topic: KAFKA_TOPICS.ListDeleted;
  data: {
    id: string;
    boardId: string;
  };
}
