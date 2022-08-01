import { KafkaTopics } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardUpdatedEvent {
  topic: KafkaTopics.BoardUpdated;
  data: IBoardCreatedEvent['data'];
}
