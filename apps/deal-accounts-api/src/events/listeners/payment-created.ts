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

  handleEachMessage = async ({ message }) => {
    const data = this.serialiseData<IPaymentCreatedEvent['data']>(
      message.value
    );
    console.log('Event data ', data);

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

      new AccountUpdatedPublisher(kafkaService.client).publish(eventData);
    } catch (error) {
      return error.message;
    }
  };
}
