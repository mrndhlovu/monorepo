import { ACTION_TYPES, KafkaTopics } from '../../types';

export interface INewActionEvent {
  topic: KafkaTopics.NewAction;
  data: [
    {
      actionKey: string;
      entities: { boardId: string; name?: string; [key: string]: any };
      type: ACTION_TYPES;
      userId: string;
    }
  ];
}
