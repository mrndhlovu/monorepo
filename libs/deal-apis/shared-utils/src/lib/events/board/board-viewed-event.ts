import { KafkaTopics } from '../../types';

export interface IBoardViewedEvent {
  topic: KafkaTopics.BoardViewed;
  data: [
    {
      userId: string;
      boardId: string;
    }
  ];
}
