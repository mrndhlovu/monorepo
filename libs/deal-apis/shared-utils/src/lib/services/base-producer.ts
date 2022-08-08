import { KAFKA_TOPICS } from '../types';
import { Kafka, ProducerRecord } from 'kafkajs';

interface IKafkaEvent {
  topic: KAFKA_TOPICS;
  data: unknown;
}

export abstract class Producer<T extends IKafkaEvent> {
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
        messages: Array.isArray(data)
          ? data
          : [{ value: JSON.stringify(data) }],
      } as ProducerRecord);

      console.log('Sent Successfully!');
      await producer.disconnect();
    } catch (error) {
      console.error({ error });
    }
  }
}
