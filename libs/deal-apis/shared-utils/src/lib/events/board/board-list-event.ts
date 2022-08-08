import { KAFKA_TOPICS } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardListEvent {
  topic: KAFKA_TOPICS.GetBoards;
  data: IBoardCreatedEvent['data'][];
}
