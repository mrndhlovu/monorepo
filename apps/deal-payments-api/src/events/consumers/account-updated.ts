import { stripeService } from '../../services';
import {
  kafkaService,
  Consumer,
  KafkaTopics,
  CONSUMER_GROUPS,
  IAccountUpdatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { CustomerCreatedProducer } from '../producers';

export class AccountUpdatedConsumer extends Consumer<IAccountUpdatedEvent> {
  readonly topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
  groupId = CONSUMER_GROUPS.PAYMENTS;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IAccountUpdatedEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    const customer =
      await stripeService.createDefaultStripeCustomerSubscription(data);
    await new CustomerCreatedProducer(kafkaService.client).publish({
      userId: data.userId,
      customerId: customer.id,
      accountId: data.id,
    });
  }
}
