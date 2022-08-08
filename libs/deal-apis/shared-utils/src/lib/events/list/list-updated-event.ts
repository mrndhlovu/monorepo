import { KAFKA_TOPICS } from '../../types';

export interface IListUpdatedEvent {
  topic: KAFKA_TOPICS.ListUpdated;
  data: {
    id: string;
    boardId: string;
  };
}
