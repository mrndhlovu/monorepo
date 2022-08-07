import {
  IAccountDeletedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedProducer extends Producer<IAccountDeletedEvent> {
  topic: KafkaTopics.AccountDeleted = KafkaTopics.AccountDeleted;
}
