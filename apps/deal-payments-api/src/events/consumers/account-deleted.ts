import Payment from '../../models/Payment';
import Order from '../../models/Order';
import { paymentService, stripeService } from '../../services';
import {
  Consumer,
  KAFKA_TOPICS,
  CONSUMER_GROUPS,
  IAccountDeletedEvent,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedConsumer extends Consumer<IAccountDeletedEvent> {
  readonly topic: KAFKA_TOPICS.AccountDeleted = KAFKA_TOPICS.AccountDeleted;
  groupId = CONSUMER_GROUPS.PAYMENTS;

  async handleEachMessage({ message }) {
    const data = JSON.parse(message.value) as IAccountDeletedEvent['data'];

    console.log('EVENT RECEIVED====> ', data);

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
