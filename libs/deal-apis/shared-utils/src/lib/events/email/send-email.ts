import { KAFKA_TOPICS } from '../../types';

export interface IEmailEvent {
  topic: KAFKA_TOPICS.Email;
  data: {
    body?: string;
    cc?: string;
    email: string;
    from: string;
    subject: string;
    html?: string;
  };
}
