import { KafkaTopics } from '../../types';

export interface IListCreatedEvent {
  topic: KafkaTopics.ListCreated;
  data: {
    id: string;
    boardId: string;
  };
}
