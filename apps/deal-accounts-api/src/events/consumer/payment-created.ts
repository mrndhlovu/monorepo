import { Message } from 'node-nats-streaming';

import {
  IPaymentCreatedEvent,
  Consumer,
  CONSUMER_GROUPS,
  KafkaTopics,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';

import { AccountUpdatedProducer } from '../producers';
import { accountService } from '../../services';

export class PaymentCreatedConsumer extends Consumer<IPaymentCreatedEvent> {
  readonly topic: KafkaTopics.PaymentCreated = KafkaTopics.PaymentCreated;
  groupId = CONSUMER_GROUPS.PAYMENTS;

  handleEachMessage = async ({ message }) => {
    const data = JSON.parse(message.value) as IPaymentCreatedEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    try {
      const account = await accountService.findAccountByIdAndUpdate(
        {
          expiresAt: data?.expiresAt,
          isTrial: data.isTrial,
          plan: data.plan,
        },
        data.ownerId
      );

      if (!account)
        throw new Error('Account with that user name was not found');

      const eventData = accountService.getEventData(account);

      await account.save();

      await new AccountUpdatedProducer(kafkaService.client).publish(eventData);
    } catch (error) {
      return error.message;
    }
  };
}
