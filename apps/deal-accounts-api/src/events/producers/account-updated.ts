import {
  IAccountUpdatedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountUpdatedProducer extends Producer<IAccountUpdatedEvent> {
  topic: KAFKA_TOPICS.AccountUpdated = KAFKA_TOPICS.AccountUpdated;
}
