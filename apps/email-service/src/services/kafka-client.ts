import { kafkaService } from '@loxodonta/deal-apis/shared-utils';
import { SendEmailConsumer } from '../events/consumers';

export class KafkaClient {
  static async run() {
    await kafkaService.init();
    await new SendEmailConsumer(kafkaService.client).listen();
  }
}
