import { KafkaTopics } from '../../types';

export interface IBoardCreatedEvent {
  topic: KafkaTopics.BoardCreated;
  data: [
    {
      id: string;
      ownerId: string;
    }
  ];
}
