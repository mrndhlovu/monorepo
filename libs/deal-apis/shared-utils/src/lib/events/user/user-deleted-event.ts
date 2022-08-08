import { IEventUserData, KAFKA_TOPICS } from '../../types';

interface UserData extends IEventUserData {
  email: string;
  boardIds: string[];
}

export interface IUserDeletedEvent {
  topic: KAFKA_TOPICS.UserDeleted;
  data: UserData;
}
