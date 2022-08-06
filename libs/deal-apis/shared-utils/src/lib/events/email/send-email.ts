import { KafkaTopics } from '../../types';

export interface IEmailEvent {
  topic: KafkaTopics.Email;
  data: {
    body?: string;
    cc?: string;
    email: string;
    from: string;
    subject: string;
    html?: string;
  };
}
