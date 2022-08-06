import {
  IEmailEvent,
  queueGroupNames,
  KafkaTopics,
  Consumer,
} from '@loxodonta/deal-apis/shared-utils';
import { EmailService } from '../../services';

export class SendEmailListener extends Consumer<IEmailEvent> {
  readonly topic: KafkaTopics.Email = KafkaTopics.Email;
  queueGroupName = queueGroupNames.EMAIL_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IEmailEvent['data']>(message.value);
    console.log('Event data', data);

    await EmailService.send(data);
  }
}
