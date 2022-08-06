import {
  BadRequestError,
  Database,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import app from './app';
import {
  AuthActionListener,
  NotificationCreatedConsumer,
  PaymentCreatedConsumer,
  UserDeletedConsumer,
  UserVerifiedConsumer,
} from './events/listeners';

class Server {
  private loadEnvVariables() {
    const {
      PORT,
      MONGO_URI,
      SPOTIFY_REDIRECT_URI,
      SPOTIFY_SECRET,
      SPOTIFY_ID,
      KAFKA_CLIENT_ID,
      KAFKA_BROKERS,
    } = process.env;

    if (
      !PORT ||
      !MONGO_URI ||
      !SPOTIFY_ID ||
      !SPOTIFY_REDIRECT_URI ||
      !SPOTIFY_SECRET ||
      !KAFKA_BROKERS ||
      !KAFKA_CLIENT_ID
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  private async connectEventBus() {
    await kafkaService.init({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS],
    });

    await new UserDeletedConsumer(kafkaService.client).listen();
    await new UserVerifiedConsumer(kafkaService.client).listen();
    await new PaymentCreatedConsumer(kafkaService.client).listen();
    await new AuthActionListener(kafkaService.client).listen();
    await new NotificationCreatedConsumer(kafkaService.client).listen();
  }

  async start() {
    this.loadEnvVariables();

    const { NODE_ENV, PORT } = process.env;
    console.log({ PORT });

    const port = 5001; //parseInt(PORT!, 10);

    await this.connectEventBus();

    await Database.connect({ dbName: 'accounts', uri: process.env.MONGO_URI });
    app.listen(port, () => {
      const serverStatus = [
        {
          '[ACS] Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ];
      console.table(serverStatus);
    });
  }
}

const server = new Server();

server.start();
