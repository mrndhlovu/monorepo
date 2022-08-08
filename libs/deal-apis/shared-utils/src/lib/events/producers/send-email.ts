import { Producer } from '../../services/base-producer';
import { KAFKA_TOPICS } from '../../types';
import { IEmailEvent } from '../email/send-email';

export class SendEmailProducer extends Producer<IEmailEvent> {
  topic: KAFKA_TOPICS.Email = KAFKA_TOPICS.Email;
}
