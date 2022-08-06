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

  handleEachMessage = async ({ message }) => {
    const data = this.serialiseData<ICreateNotificationEvent['data']>(
      message.value
    );
    console.log('Event data ', data);

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
