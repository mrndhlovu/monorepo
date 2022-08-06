import { Kafka } from 'kafkajs';
import { IKafkaInitConfig, KafkaTopics } from '../types';

class KafkaService {
  private _client?: Kafka;

  get client() {
    if (!this._client)
      throw new Error('Server cannot access KAFKA client before connecting');
    return this._client;
  }

  get topics() {
    return Object.values(KafkaTopics).map((value) => ({
      topic: value,
      numPartitions: 2,
    }));
  }

  async init({ clientId }: IKafkaInitConfig) {
    try {
      this._client = new Kafka({
        clientId,
        brokers: [process.env.KAFKA_BROKERS!],
      });

      const admin = this.client.admin();
      console.log('Connecting...');

      await admin.connect();
      console.log('Connected!');
      const topics = Object.values(KafkaTopics);
      const topics2 = Object.keys(KafkaTopics);

      // await admin.deleteTopics({ topics: topics2 });
      // await admin.deleteTopics({ topics });

      await admin.createTopics({
        waitForLeaders: true,
        topics: this.topics,
      });

      console.log('Created Successfully!');
      await admin.disconnect();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
export const kafkaService = new KafkaService();
