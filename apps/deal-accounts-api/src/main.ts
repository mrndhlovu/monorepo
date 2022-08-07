import { BadRequestError, Database } from '@loxodonta/deal-apis/shared-utils';
import { KafkaClient } from './services';
import app from './app';

class Server {
  private static loadEnvVariables() {
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

  static async start() {
    Server.loadEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = 5001; //parseInt(PORT!, 10);

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

KafkaClient.run();
Server.start();
