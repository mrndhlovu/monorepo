import { Message } from 'node-nats-streaming';

import {
  Consumer,
  KAFKA_TOPICS,
  CONSUMER_GROUPS,
  IAuthedActionEvent,
  ACTION_KEYS,
} from '@loxodonta/deal-apis/shared-utils';
import Action from '../../models/Action';
import { getNotificationContext } from '../../helpers';
import Notification from '../../models/Notification';

export class AuthActionConsumer extends Consumer<IAuthedActionEvent> {
  readonly topic: KAFKA_TOPICS.AuthedAction = KAFKA_TOPICS.AuthedAction;
  groupId = CONSUMER_GROUPS.AUTH_ACTION;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IAuthedActionEvent['data'];
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
