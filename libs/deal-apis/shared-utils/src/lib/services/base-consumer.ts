import { EachMessagePayload, Kafka } from 'kafkajs';
import { KafkaTopics } from '../types';

interface IEvent {
  topic: KafkaTopics;
  data: unknown;
}

export abstract class Consumer<T extends IEvent> {
  abstract handleEachMessage(options: EachMessagePayload): Promise<void>;
  abstract topic: T['topic'];
  abstract queueGroupName: string;
  private client: Kafka;

  constructor(client: Kafka) {
    this.client = client;
  }

  serialiseData<T>(data: string) {
    if (!data) return;
    return JSON.parse(data) as T;
  }

  async listen(): Promise<void> {
    try {
      const consumer = this.client.consumer({
        groupId: this.queueGroupName,
      });
      console.log('Connecting consumer...');
      await consumer.connect();
      console.log('Connected!');
      console.log({ topic: this.topic });

      consumer.subscribe({
        topic: this.topic,
        fromBeginning: true,
      });

      await consumer.run({
        eachMessage: this.handleEachMessage,
      });

      console.log('Sent Successfully!');
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
