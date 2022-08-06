import {
  IUserVerifiedEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class UserVerifiedProducer extends Producer<IUserVerifiedEvent> {
  topic: KafkaTopics.UserVerified = KafkaTopics.UserVerified;
}
