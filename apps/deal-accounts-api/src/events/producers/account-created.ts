import {
  IAccountCreatedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountCreatedProducer extends Producer<IAccountCreatedEvent> {
  topic: KAFKA_TOPICS.AccountCreated = KAFKA_TOPICS.AccountCreated;
}
