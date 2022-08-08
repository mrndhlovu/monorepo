import {
  IUserDeletedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class UserDeletedProducer extends Producer<IUserDeletedEvent> {
  topic: KAFKA_TOPICS.UserDeleted = KAFKA_TOPICS.UserDeleted;
}
