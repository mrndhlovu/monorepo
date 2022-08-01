import { Producer } from '../../services/base-producer';
import { KafkaTopics } from '../../types';
import { IEmailEvent } from '../email/send-email';

export class SendEmailPublisher extends Producer<IEmailEvent> {
  topic: KafkaTopics.Email = KafkaTopics.Email;
}
