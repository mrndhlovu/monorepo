import { Producer } from '../../services/base-producer';
import { KafkaTopics } from '../../types';

export class CreateNotificationPublisher extends Producer<ICreateNotificationEvent> {
  topic: KafkaTopics.CreateNotification = KafkaTopics.CreateNotification;
}

export interface ICreateNotificationEvent {
  topic: KafkaTopics.CreateNotification;
  data: [
    {
      body: string;
      id?: string;
      subject: string;
      title: string;
      actionKey?: string;
      user: {
        id: string;
        initials: string;
      };
    }
  ];
}
