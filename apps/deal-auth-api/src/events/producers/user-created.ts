import {
  IUserCreatedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class UserCreatedProducer extends Producer<IUserCreatedEvent> {
  topic: KAFKA_TOPICS.UserCreated = KAFKA_TOPICS.UserCreated;
}
