import { INewActionEvent } from '../user/new-action';
import { Producer } from '../../services/base-producer';
import { KAFKA_TOPICS } from '../../types';

export class NewActionProducer extends Producer<INewActionEvent> {
  topic: KAFKA_TOPICS.NewAction = KAFKA_TOPICS.NewAction;
}
