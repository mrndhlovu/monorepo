import {
  IAccountUpdatedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountUpdatedPublisher extends Producer<IAccountUpdatedEvent> {
  topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
}
