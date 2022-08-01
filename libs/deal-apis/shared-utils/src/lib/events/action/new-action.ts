import { INewActionEvent } from '../user/new-action';
import { Producer } from '../../services/base-producer';
import { KafkaTopics } from '../../types';

export class NewActionPublisher extends Producer<INewActionEvent> {
  topic: KafkaTopics.NewAction = KafkaTopics.NewAction;
}
