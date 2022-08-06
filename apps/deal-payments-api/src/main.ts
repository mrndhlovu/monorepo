import {
  BadRequestError,
  kafkaService,
  Database,
} from '@loxodonta/deal-apis/shared-utils';

import app from './app';
import {
  AccountUpdatedConsumer,
  AccountDeletedConsumer,
} from './events/listeners';

class Server {
  private static loadEnvVariables() {
    const {
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      NATS_URL,
      MONGO_URI,
      PORT,
      STRIPE_SECRET_KEY,
      KAFKA_CLIENT_ID,
      KAFKA_BROKERS,
    } = process.env;

    if (
      !NATS_CLIENT_ID ||
      !NATS_CLUSTER_ID ||
      !NATS_URL ||
      !MONGO_URI ||
      !PORT ||
      !STRIPE_SECRET_KEY ||
      !KAFKA_BROKERS ||
      !KAFKA_CLIENT_ID
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  private static async connectEventBus() {
    await kafkaService.init({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS],
    });

    new AccountUpdatedConsumer(kafkaService.client).listen();
    new AccountDeletedConsumer(kafkaService.client).listen();
  }

  static async start() {
    Server.loadEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = 5002; //parseInt(PORT!, 10);

    await Server.connectEventBus();

    await Database.connect({ dbName: 'auth', uri: process.env.MONGO_URI });
    app.listen(port, () => {
      const serverStatus = [
        {
          '[PS] Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ];
      console.table(serverStatus);
    });
  }
}

Server.start();
