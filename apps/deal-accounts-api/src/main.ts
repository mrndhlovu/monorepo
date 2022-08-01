import { BadRequestError, Database } from '@loxodonta/deal-apis/shared-utils';

import app from './app';

class Server {
  private loadEnvVariables() {
    const {
      PORT,
      MONGO_URI,
      SPOTIFY_REDIRECT_URI,
      SPOTIFY_SECRET,
      SPOTIFY_ID,
    } = process.env;

    if (
      !PORT ||
      !MONGO_URI ||
      !SPOTIFY_ID ||
      !SPOTIFY_REDIRECT_URI ||
      !SPOTIFY_SECRET
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  private async connectEventBus() {
    //   const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = process.env;
    //   await natsService.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_URL!);
    //   natsService.handleOnclose();
    //   new UserDeletedConsumer (natsService.client).listen();
    //   new UserVerifiedConsumer (natsService.client).listen();
    //   new PaymentCreatedConsumer (natsService.client).listen();
    //   new AuthActionListener(natsService.client).listen();
    //   new NotificationCreatedConsumer (natsService.client).listen();
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
