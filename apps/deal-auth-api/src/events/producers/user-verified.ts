import {
  IUserVerifiedEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class UserVerifiedProducer extends Producer<IUserVerifiedEvent> {
  topic: KAFKA_TOPICS.UserVerified = KAFKA_TOPICS.UserVerified;
}
