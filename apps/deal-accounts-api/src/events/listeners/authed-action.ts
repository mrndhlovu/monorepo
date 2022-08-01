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

  async handleEachMessage(data: IAuthedActionEvent['data']) {
    console.log(data);

    data.forEach(async (msg) => {
      if (msg.actionKey === ACTION_KEYS.REMOVE_CARD_ATTACHMENT) {
        const action = await Action.findOne({
          'entities.attachment.id': msg.entities?.attachment.id,
        });

        if (action) {
          await action.delete();
        }
      }
      const action = new Action({
        type: msg.type,
        memberCreator: msg.user,
        translationKey: msg.actionKey,
        entities: msg.entities,
      });

      const notificationContext = getNotificationContext(msg.actionKey);

      if (notificationContext.body) {
        const notification = new Notification({
          isRead: false,
          body: notificationContext.body,
          subject: notificationContext.subject!,
          title: notificationContext.title!,
          user: { id: msg.user.id!, initials: msg.user.initials! },
          actionKey: msg.actionKey,
        });

        await notification.save();
      }

      await action.save();
    });
  }
}
