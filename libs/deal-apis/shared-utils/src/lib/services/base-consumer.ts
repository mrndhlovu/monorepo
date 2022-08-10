import { Kafka, KafkaMessage } from 'kafkajs';
import { KAFKA_TOPICS } from '../types';

interface IEvent {
  topic: KAFKA_TOPICS;
  data: unknown;
}

export abstract class Consumer<T extends IEvent> {
  abstract handleEachMessage(options: { message: KafkaMessage }): Promise<void>;
  abstract topic: T['topic'];
  abstract groupId: string;
  private client: Kafka;

  constructor(client: Kafka) {
    this.client = client;
  }

  async listen(): Promise<void> {
    try {
      const consumer = this.client.consumer({ groupId: this.groupId });
      console.log('Connecting consumer...');
      await consumer.connect();
      console.log('Connected!');

      await consumer.subscribe({
        topics: [this.topic],
        fromBeginning: false,
      });

      await consumer.run({
        autoCommitInterval: 5000,
        autoCommitThreshold: 1,
        eachMessage: this.handleEachMessage,
      });

      console.log('CONSUMER LISTENING!');
    } catch (error: any) {
      console.log('ERROR:====> ', error);
    }
  }
}
