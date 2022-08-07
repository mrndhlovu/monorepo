import { Kafka, KafkaMessage } from 'kafkajs';
import { KafkaTopics } from '../types';

interface IEvent {
  topic: KafkaTopics;
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
      const consumer = this.client.consumer({
        groupId: this.groupId,
      });
      console.log('Connecting consumer...');
      await consumer.connect();
      console.log('Connected!');
      console.log({ topic: this.topic });

      consumer.subscribe({ topic: this.topic });

      await consumer.run({
        autoCommit: true,
        eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
          for (let message of batch.messages) {
            console.log(`TOPIC:====> ${this.topic}`);

            await this.handleEachMessage({ message });
            await resolveOffset(message.offset);
            await heartbeat();
          }
        },
      });

      console.log('CONSUMER LISTENING!');
    } catch (error: any) {
      console.log('ERROR:====> ', error);
    }
  }
}
