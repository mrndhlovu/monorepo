import {
  BadRequestError,
  Database,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import {
  BoardCreatedConsumer,
  BoardDeletedConsumer,
  AccountUpdatedConsumer,
  NewActionConsumer,
  BoardViewedConsumer,
  WorkspaceCreatedConsumer,
} from './events/listeners/index';

import app from './app';

class Server {
  private static validateEnvVariables() {
    const {
      PORT,
      JWT_ACCESS_TOKEN_SIGNATURE,
      JWT_REFRESH_TOKEN_SIGNATURE,
      JWT_OTP_TOKEN_SIGNATURE,
      MONGO_URI,
      KAFKA_CLIENT_ID,
      TOTP_AUTHENTICATOR_SECRET,
      KAFKA_BROKERS,
    } = process.env;

    if (
      !PORT ||
      !JWT_ACCESS_TOKEN_SIGNATURE ||
      !JWT_REFRESH_TOKEN_SIGNATURE ||
      !JWT_OTP_TOKEN_SIGNATURE ||
      !MONGO_URI ||
      !TOTP_AUTHENTICATOR_SECRET ||
      !KAFKA_BROKERS ||
      !KAFKA_CLIENT_ID
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.validateEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = parseInt(PORT!, 10) || 5000;

    await kafkaService.init({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS],
    });

    // new BoardCreatedConsumer(kafkaService.client).listen();
    // new BoardDeletedConsumer(kafkaService.client).listen();
    // new AccountUpdatedConsumer(kafkaService.client).listen();
    // new BoardViewedConsumer(kafkaService.client).listen();
    // new NewActionConsumer(kafkaService.client).listen();
    new WorkspaceCreatedConsumer(kafkaService.client).listen();

    await Database.connect({ dbName: 'auth', uri: process.env.MONGO_URI });
    app.listen(port, () => {
      const serverStatus = [
        {
          'Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ];
      console.table(serverStatus);
    });
  }
}

Server.start();
