import { kafkaService } from '@loxodonta/deal-apis/shared-utils';
import {
  AuthActionConsumer,
  NotificationCreatedConsumer,
  PaymentCreatedConsumer,
  UserDeletedConsumer,
  UserVerifiedConsumer,
} from '../events/consumer';

export class KafkaClient {
  static async run() {
    await kafkaService.init();

    await new UserVerifiedConsumer(kafkaService.client).listen();
    await new UserDeletedConsumer(kafkaService.client).listen();
    await new PaymentCreatedConsumer(kafkaService.client).listen();
    await new AuthActionConsumer(kafkaService.client).listen();
    await new NotificationCreatedConsumer(kafkaService.client).listen();
  }
}
