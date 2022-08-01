import {
  IAccountDeletedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedPublisher extends Producer<IAccountDeletedEvent> {
  topic: KafkaTopics.AccountDeleted = KafkaTopics.AccountDeleted;
}
