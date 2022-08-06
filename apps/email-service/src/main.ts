import {
  BadRequestError,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';
import app from './app';
import { SendEmailListener } from './events/consumers';

class Server {
  private static loadEnvVariables() {
    const { PORT, MAILGUN_SECRET_KEY, KAFKA_CLIENT_ID, KAFKA_BROKERS } =
      process.env;

    if (!PORT || !MAILGUN_SECRET_KEY || !KAFKA_BROKERS || !KAFKA_CLIENT_ID) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  private static async connectEventBus() {
    await kafkaService.init({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS],
    });
    new SendEmailListener(kafkaService.client).listen();
  }

  static async start() {
    Server.loadEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = 5003; // parseInt(PORT!, 10);

    await Server.connectEventBus();

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

Server.start();
