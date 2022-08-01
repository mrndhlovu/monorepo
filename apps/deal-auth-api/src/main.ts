import { BadRequestError, Database } from '@loxodonta/deal-apis/shared-utils';

import app from './app';

class Server {
  private static validateEnvVariables() {
    const {
      PORT,
      JWT_ACCESS_TOKEN_SIGNATURE,
      JWT_REFRESH_TOKEN_SIGNATURE,
      JWT_OTP_TOKEN_SIGNATURE,
      MONGO_URI,
      TOTP_AUTHENTICATOR_SECRET,
    } = process.env;

    if (
      !PORT ||
      !JWT_ACCESS_TOKEN_SIGNATURE ||
      !JWT_REFRESH_TOKEN_SIGNATURE ||
      !JWT_OTP_TOKEN_SIGNATURE ||
      !MONGO_URI ||
      !TOTP_AUTHENTICATOR_SECRET
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.validateEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = parseInt(PORT!, 10) || 5000;

    // await natsService.connect(
    //   process.env.NATS_CLUSTER_ID!,
    //   process.env.NATS_CLIENT_ID!,
    //   process.env.NATS_URL!
    // );
    // natsService.disconnect();

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
