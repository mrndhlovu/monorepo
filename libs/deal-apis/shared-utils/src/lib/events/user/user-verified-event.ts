import { IEventUserData, KafkaTopics } from '../../types';

export interface IUserVerifiedEvent {
  topic: KafkaTopics.UserVerified;
  data: IEventUserData[];
}
