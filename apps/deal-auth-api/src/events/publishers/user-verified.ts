import {
  IUserVerifiedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class UserVerifiedPublisher extends Producer<IUserVerifiedEvent> {
  topic: KafkaTopics.UserVerified = KafkaTopics.UserVerified;
}
