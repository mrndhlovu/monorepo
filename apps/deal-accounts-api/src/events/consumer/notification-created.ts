import { Message } from 'node-nats-streaming';

import {
  Consumer,
  CONSUMER_GROUPS,
  KafkaTopics,
  ICreateNotificationEvent,
} from '@loxodonta/deal-apis/shared-utils';

import Notification from '../../models/Notification';

export class NotificationCreatedConsumer extends Consumer<ICreateNotificationEvent> {
  readonly topic: KafkaTopics.CreateNotification =
    KafkaTopics.CreateNotification;
  groupId = CONSUMER_GROUPS.ACCOUNT;

  handleEachMessage = async ({ message }) => {
    const data = JSON.parse(message.value) as ICreateNotificationEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    try {
      const notification = new Notification({
        body: data.body,
        isRead: false,
        subject: data.subject,
        actionKey: data.actionKey,
        user: data.user,
      });

      await notification.save();
    } catch (error) {
      return error;
    }
  };
}
