import { ACTION_TYPES, IEventUserData, KAFKA_TOPICS } from '../../types';

interface UserData extends IEventUserData {
  username: string;
  fullName?: string;
  initials: string;
}

export interface IAuthedActionEvent {
  topic: KAFKA_TOPICS.AuthedAction;
  data: {
    actionKey: string;
    entities: { [key: string]: any };
    type: ACTION_TYPES;
    user: UserData;
  };
}
