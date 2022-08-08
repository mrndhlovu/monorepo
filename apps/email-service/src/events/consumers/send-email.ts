import {
  IEmailEvent,
  CONSUMER_GROUPS,
  KAFKA_TOPICS,
  Consumer,
} from '@loxodonta/deal-apis/shared-utils';
import { EmailService } from '../../services';

export class SendEmailConsumer extends Consumer<IEmailEvent> {
  readonly topic: KAFKA_TOPICS.Email = KAFKA_TOPICS.Email;
  groupId = CONSUMER_GROUPS.EMAIL;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IEmailEvent['data'];

    console.log('EVENT RECEIVED====>', data);

    await EmailService.send(data);
  }
}
