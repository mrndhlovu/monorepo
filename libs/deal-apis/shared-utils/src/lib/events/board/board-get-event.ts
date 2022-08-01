import { KafkaTopics } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardEvent {
  topic: KafkaTopics.GetBoardById;
  data: IBoardCreatedEvent['data'];
}
