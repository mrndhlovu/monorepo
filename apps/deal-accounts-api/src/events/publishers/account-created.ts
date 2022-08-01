import {
  IAccountCreatedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountCreatedPublisher extends Producer<IAccountCreatedEvent> {
  topic: KafkaTopics.AccountCreated = KafkaTopics.AccountCreated;
}
