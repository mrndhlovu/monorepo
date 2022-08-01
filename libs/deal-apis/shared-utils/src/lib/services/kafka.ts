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
    return Object.keys(KafkaTopics).map((key) => ({
      topic: key,
      numPartitions: 2,
    }));
  }

  async init({ clientId, brokers }: IKafkaInitConfig) {
    this._client = new Kafka({
      clientId,
      brokers,
    });

    const admin = this.client.admin();
    console.log('Connecting...');

    await admin.connect();
    console.log('Connected!');
    await admin.createTopics({
      topics: this.topics,
    });

    console.log('Created Successfully!');
    await admin.disconnect();
  }
}
export const kafkaService = new KafkaService();
