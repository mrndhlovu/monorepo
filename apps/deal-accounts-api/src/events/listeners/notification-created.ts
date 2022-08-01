import { Message } from 'node-nats-streaming';

import {
  Consumer,
  queueGroupNames,
  KafkaTopics,
  ICreateNotificationEvent,
} from '@loxodonta/deal-apis/shared-utils';

import Notification from '../../models/Notification';

export class NotificationCreatedConsumer extends Consumer<ICreateNotificationEvent> {
  readonly topic: KafkaTopics.CreateNotification =
    KafkaTopics.CreateNotification;
  queueGroupName = queueGroupNames.ACCOUNT_QUEUE_GROUP;

  handleEachMessage = async (data: ICreateNotificationEvent['data']) => {
    console.log('Event data ', data);

    try {
      data.forEach(async (msg) => {
        const notification = new Notification({
          body: msg.body,
          isRead: false,
          subject: msg.subject,
          actionKey: msg.actionKey,
          user: msg.user,
        });

        await notification.save();
      });
    } catch (error) {
      return error;
    }
  };
}
