import { KAFKA_TOPICS, IEventUserData } from '../../types';

interface UserData extends IEventUserData {
  username: string;
  initials?: string;
  otp: string;
}

export interface IUserCreatedEvent {
  topic: KAFKA_TOPICS.UserCreated;
  data: UserData;
}
