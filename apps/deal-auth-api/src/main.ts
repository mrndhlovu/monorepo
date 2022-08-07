import { BadRequestError, Database } from '@loxodonta/deal-apis/shared-utils';
import { KafkaClient } from './services';
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

    await Database.connect({ dbName: 'auth', uri: process.env.MONGO_URI });
    app.listen(port, () => {
      const serverStatus = [
        {
          '[AS]Server Status': 'Online',
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
