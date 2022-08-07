import {
  IUserDeletedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class UserDeletedProducer extends Producer<IUserDeletedEvent> {
  topic: KafkaTopics.UserDeleted = KafkaTopics.UserDeleted;
}
