import { paymentService, stripeService } from '../../services';
import {
  kafkaService,
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IAccountUpdatedEvent,
} from '@loxodonta/deal-apis/shared-utils';
import { CustomerCreatedProducer } from '../publishers';

export class AccountUpdatedConsumer extends Consumer<IAccountUpdatedEvent> {
  readonly topic: KafkaTopics.AccountUpdated = KafkaTopics.AccountUpdated;
  queueGroupName = queueGroupNames.PAYMENTS_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IAccountUpdatedEvent['data']>(
      message.value
    );
    console.log('Event data ', data);

    const order = await paymentService.findOrderByOwnerId(data.id);

    if (data.isVerified && !order) {
      const customer =
        await stripeService.createDefaultStripeCustomerSubscription(data);
      new CustomerCreatedProducer(kafkaService.client).publish({
        userId: data.id,
        customerId: customer.id,
      });
    }
  }
}
