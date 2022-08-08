import { ACTION_TYPES, KAFKA_TOPICS } from '../../types';

export interface INewActionEvent {
  topic: KAFKA_TOPICS.NewAction;
  data: {
    actionKey: string;
    entities: { boardId: string; name?: string; [key: string]: any };
    type: ACTION_TYPES;
    userId: string;
  };
}
