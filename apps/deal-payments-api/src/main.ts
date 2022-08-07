import { BadRequestError, Database } from '@loxodonta/deal-apis/shared-utils';
import { KafkaClient } from './services/kafka-client';
import app from './app';

class Server {
  private static loadEnvVariables() {
    const {
      MONGO_URI,
      PORT,
      STRIPE_SECRET_KEY,
      KAFKA_CLIENT_ID,
      KAFKA_BROKERS,
    } = process.env;

    if (
      !MONGO_URI ||
      !PORT ||
      !STRIPE_SECRET_KEY ||
      !KAFKA_BROKERS ||
      !KAFKA_CLIENT_ID
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.loadEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = 5002; //parseInt(PORT!, 10);

    await Database.connect({ dbName: 'payments', uri: process.env.MONGO_URI });
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

KafkaClient.run();
Server.start();
