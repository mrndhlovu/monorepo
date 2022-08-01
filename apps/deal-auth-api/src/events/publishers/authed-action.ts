import {
  IAuthedActionEvent,
  Producer,
  KafkaTopics,
} from '@loxodonta/deal-apis/shared-utils';

export class AuthedActionPublisher extends Producer<IAuthedActionEvent> {
  topic: KafkaTopics.AuthedAction = KafkaTopics.AuthedAction;
}
