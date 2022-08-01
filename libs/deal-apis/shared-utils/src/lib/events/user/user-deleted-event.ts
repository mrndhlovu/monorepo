import { IEventUserData, KafkaTopics } from '../../types';

interface UserData extends IEventUserData {
  email: string;
  boardIds: string[];
}

export interface IUserDeletedEvent {
  topic: KafkaTopics.UserDeleted;
  data: UserData[];
}
