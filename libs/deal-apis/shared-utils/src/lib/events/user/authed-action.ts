import { ACTION_TYPES, IEventUserData, KafkaTopics } from '../../types';

interface UserData extends IEventUserData {
  username: string;
  fullName?: string;
  initials: string;
}

export interface IAuthedActionEvent {
  topic: KafkaTopics.AuthedAction;
  data: {
    actionKey: string;
    entities: { [key: string]: any };
    type: ACTION_TYPES;
    user: UserData;
  };
}
