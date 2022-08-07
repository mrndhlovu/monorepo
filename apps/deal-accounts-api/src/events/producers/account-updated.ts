import {
  IAccountUpdatedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountUpdatedProducer extends Producer<IAccountUpdatedEvent> {
  topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
}
