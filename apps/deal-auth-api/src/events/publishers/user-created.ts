import {
  IUserCreatedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class UserCreatedPublisher extends Producer<IUserCreatedEvent> {
  topic: KafkaTopics.UserCreated = KafkaTopics.UserCreated;
}
