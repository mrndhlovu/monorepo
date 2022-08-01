import { KafkaTopics } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardListEvent {
  topic: KafkaTopics.GetBoards;
  data: IBoardCreatedEvent['data'][];
}
