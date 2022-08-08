import {
  IAuthedActionEvent,
  Producer,
  KAFKA_TOPICS,
} from '@loxodonta/deal-apis/shared-utils';

export class AuthedActionProducer extends Producer<IAuthedActionEvent> {
  topic: KAFKA_TOPICS.AuthedAction = KAFKA_TOPICS.AuthedAction;
}
