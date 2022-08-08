import { KAFKA_TOPICS } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardUpdatedEvent {
  topic: KAFKA_TOPICS.BoardUpdated;
  data: IBoardCreatedEvent['data'];
}
