import { BadRequestError } from '@loxodonta/deal-apis/shared-utils';
import { KafkaClient } from './services/kafka-client';
import app from './app';

class Server {
  private static loadEnvVariables() {
    const { PORT, MAILGUN_SECRET_KEY, KAFKA_CLIENT_ID, KAFKA_BROKERS } =
      process.env;

    if (!PORT || !MAILGUN_SECRET_KEY || !KAFKA_BROKERS || !KAFKA_CLIENT_ID) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.loadEnvVariables();

    const { NODE_ENV } = process.env;

    const port = 5003; //parseInt(PORT!, 10);

    app.listen(port, () => {
      const serverStatus = [
        {
          '[ES] Server Status': 'Online',
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
