import { Message } from 'node-nats-streaming';

import {
  IPaymentCreatedEvent,
  Consumer,
  queueGroupNames,
  KafkaTopics,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import { AccountUpdatedPublisher } from '../publishers';
import { accountService } from '../../services';

export class PaymentCreatedConsumer extends Consumer<IPaymentCreatedEvent> {
  readonly topic: KafkaTopics.PaymentCreated = KafkaTopics.PaymentCreated;
  queueGroupName = queueGroupNames.PAYMENTS_QUEUE_GROUP;

  handleEachMessage = async (data: IPaymentCreatedEvent['data']) => {
    console.log('Event data ', data);

    try {
      data.forEach(async (msg) => {
        const account = await accountService.findAccountByIdAndUpdate(
          {
            expiresAt: msg?.expiresAt,
            isTrial: msg.isTrial,
            plan: msg.plan,
          },
          msg.ownerId
        );

        if (!account)
          throw new Error('Account with that user name was not found');

        const eventData = accountService.getEventData(account);

        await account.save();

        new AccountUpdatedPublisher(kafkaService.client).publish(eventData);
      });
    } catch (error) {
      return error.message;
    }
  };
}
