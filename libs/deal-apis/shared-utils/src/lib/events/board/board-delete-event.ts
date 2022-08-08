import { KAFKA_TOPICS } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardDeletedEvent {
  topic: KAFKA_TOPICS.BoardDeleted;
  data: IBoardCreatedEvent['data'];
}
