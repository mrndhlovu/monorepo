import {
  IAccountCreatedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountCreatedProducer extends Producer<IAccountCreatedEvent> {
  topic: KafkaTopics.AccountCreated = KafkaTopics.AccountCreated;
}
