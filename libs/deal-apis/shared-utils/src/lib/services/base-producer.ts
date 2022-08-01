import { KafkaTopics } from '../types';
import { Kafka, ProducerRecord } from 'kafkajs';

interface IEvent {
  topic: KafkaTopics;
  data: unknown[];
}

export abstract class Producer<T extends IEvent> {
  abstract topic: T['topic'];
  private client: Kafka;

  constructor(client: Kafka) {
    this.client = client;
  }

  async publish(data: T['data']): Promise<void> {
    try {
      const producer = this.client.producer();
      console.log('Connecting producer...');
      await producer.connect();
      console.log('Connected!');

      await producer.send({
        topic: this.topic,
        messages: data,
      } as ProducerRecord);

      console.log('Sent Successfully!');
      await producer.disconnect();
    } catch (error) {
      console.error({ error });
    }
  }
}
