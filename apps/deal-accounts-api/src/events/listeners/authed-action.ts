import { Message } from 'node-nats-streaming';

import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IAuthedActionEvent,
  ACTION_KEYS,
} from '@loxodonta/deal-apis/shared-utils';
import Action from '../../models/Action';
import { getNotificationContext } from '../../helpers';
import Notification from '../../models/Notification';

export class AuthActionListener extends Consumer<IAuthedActionEvent> {
  readonly topic: KafkaTopics.AuthedAction = KafkaTopics.AuthedAction;
  queueGroupName = queueGroupNames.AUTH_ACTION_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IAuthedActionEvent['data']>(message.value);
    console.log(data);

    if (data.actionKey === ACTION_KEYS.REMOVE_CARD_ATTACHMENT) {
      const action = await Action.findOne({
        'entities.attachment.id': data.entities?.attachment.id,
      });

      if (action) {
        await action.delete();
      }
    }
    const action = new Action({
      type: data.type,
      memberCreator: data.user,
      translationKey: data.actionKey,
      entities: data.entities,
    });

    const notificationContext = getNotificationContext(data.actionKey);

    if (notificationContext.body) {
      const notification = new Notification({
        isRead: false,
        body: notificationContext.body,
        subject: notificationContext.subject!,
        title: notificationContext.title!,
        user: { id: data.user.id!, initials: data.user.initials! },
        actionKey: data.actionKey,
      });

      await notification.save();
    }

    await action.save();
  }
}
