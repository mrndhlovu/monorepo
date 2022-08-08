import {
  IAccountDeletedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedProducer extends Producer<IAccountDeletedEvent> {
  topic: KAFKA_TOPICS.AccountDeleted = KAFKA_TOPICS.AccountDeleted;
}
