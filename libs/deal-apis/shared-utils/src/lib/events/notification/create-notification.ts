import { Producer } from '../../services/base-producer';
import { KAFKA_TOPICS } from '../../types';

export class CreateNotificationProducer extends Producer<ICreateNotificationEvent> {
  topic: KAFKA_TOPICS.CreateNotification = KAFKA_TOPICS.CreateNotification;
}

export interface ICreateNotificationEvent {
  topic: KAFKA_TOPICS.CreateNotification;
  data: {
    body: string;
    id?: string;
    subject: string;
    title: string;
    actionKey?: string;
    user: {
      id: string;
      initials: string;
    };
  };
}
