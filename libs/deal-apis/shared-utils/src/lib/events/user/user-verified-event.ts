import { IEventUserData, KAFKA_TOPICS } from '../../types';

export interface IUserVerifiedEvent {
  topic: KAFKA_TOPICS.UserVerified;
  data: IEventUserData;
}
