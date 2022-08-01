import { KafkaTopics } from '../../types';

export interface IListUpdatedEvent {
  topic: KafkaTopics.ListUpdated;
  data: {
    id: string;
    boardId: string;
  };
}
