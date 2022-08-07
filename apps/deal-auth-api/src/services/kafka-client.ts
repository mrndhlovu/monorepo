import { kafkaService } from '@loxodonta/deal-apis/shared-utils';
import {
  BoardCreatedConsumer,
  BoardDeletedConsumer,
  AccountUpdatedConsumer,
  NewActionConsumer,
  BoardViewedConsumer,
  WorkspaceCreatedConsumer,
} from '../events/consumers/index';

export class KafkaClient {
  static async run() {
    await kafkaService.init();

    await new AccountUpdatedConsumer(kafkaService.client).listen();
    // await new BoardCreatedConsumer(kafkaService.client).listen();
    // await new BoardDeletedConsumer(kafkaService.client).listen();
    // await new BoardViewedConsumer(kafkaService.client).listen();
    // await new WorkspaceCreatedConsumer(kafkaService.client).listen();
    // await new NewActionConsumer(kafkaService.client).listen();
  }
}
