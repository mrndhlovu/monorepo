import { KAFKA_TOPICS } from '../../types';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardEvent {
  topic: KAFKA_TOPICS.GetBoardById;
  data: IBoardCreatedEvent['data'];
}
