import { KafkaTopics } from '../../types';

export interface IListDeletedEvent {
  topic: KafkaTopics.ListDeleted;
  data: {
    id: string;
    boardId: string;
  };
}
