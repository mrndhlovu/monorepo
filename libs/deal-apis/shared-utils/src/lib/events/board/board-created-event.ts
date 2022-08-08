import { KAFKA_TOPICS } from '../../types';

export interface IBoardCreatedEvent {
  topic: KAFKA_TOPICS.BoardCreated;
  data: {
    id: string;
    ownerId: string;
  };
}
