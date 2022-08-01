import { KafkaTopics } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardDeletedEvent {
  topic: KafkaTopics.BoardDeleted;
  data: IBoardCreatedEvent['data'];
}
