import { KafkaTopics, IEventUserData } from '../../types';

interface UserData extends IEventUserData {
  username: string;
  initials?: string;
  otp: string;
}

export interface IUserCreatedEvent {
  topic: KafkaTopics.UserCreated;
  data: UserData[];
}
