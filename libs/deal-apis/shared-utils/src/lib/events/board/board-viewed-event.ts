import { KAFKA_TOPICS } from '../../types';

export interface IBoardViewedEvent {
  topic: KAFKA_TOPICS.BoardViewed;
  data: {
    userId: string;
    boardId: string;
  };
}
