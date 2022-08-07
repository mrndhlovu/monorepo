import { kafkaService } from '@loxodonta/deal-apis/shared-utils';
import {
  AccountUpdatedConsumer,
  AccountDeletedConsumer,
} from '../events/consumers';

export class KafkaClient {
  static async run() {
    await kafkaService.init();

    await new AccountUpdatedConsumer(kafkaService.client).listen();
    await new AccountDeletedConsumer(kafkaService.client).listen();
  }
}
