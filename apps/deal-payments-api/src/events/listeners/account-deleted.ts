import Payment from '../../models/Payment';
import Order from '../../models/Order';
import { paymentService, stripeService } from '../../services';
import {
  Consumer,
  KafkaTopics,
  queueGroupNames,
  IAccountDeletedEvent,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedConsumer extends Consumer<IAccountDeletedEvent> {
  readonly topic: KafkaTopics.AccountDeleted = KafkaTopics.AccountDeleted;
  queueGroupName = queueGroupNames.PAYMENTS_QUEUE_GROUP;

  async handleEachMessage({ message }) {
    const data = this.serialiseData<IAccountDeletedEvent['data']>(
      message.value
    );

    console.log('Event data ', data);

    try {
      const order = await paymentService.findOrderByOwnerId(data.userId);
      const customerId = order!?.customerId;

      if (customerId) {
        await stripeService.deleteCustomer(customerId);
        await Payment.deleteMany({ _id: data.userId });
        await Order.deleteMany({ ownerId: data.userId });
      }
    } catch (error) {
      return error.message;
    }
  }
}
