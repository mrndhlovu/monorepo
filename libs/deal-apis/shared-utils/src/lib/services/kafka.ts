import { Kafka } from 'kafkajs';
import { IKafkaInitConfig, KAFKA_TOPICS } from '../types';

class KafkaService {
  private _client?: Kafka;

  get client() {
    if (!this._client)
      throw new Error('Server cannot access KAFKA client before connecting');
    return this._client;
  }

  get topics() {
    return Object.values(KAFKA_TOPICS).map((value) => ({
      topic: value,
      numPartitions: 3,
    }));
  }

  async init() {
    try {
      this._client = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID!,
        brokers: [process.env.KAFKA_BROKERS!],
      });

      const admin = this.client.admin();
      console.log('Connecting...');

      await admin.connect();

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
