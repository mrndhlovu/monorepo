import Payment from '../../models/Payment';
import Order from '../../models/Order';
import { paymentService, stripeService } from '../../services';
import {
  Consumer,
  KafkaTopics,
  CONSUMER_GROUPS,
  IAccountDeletedEvent,
} from '@loxodonta/deal-apis/shared-utils';

export class AccountDeletedConsumer extends Consumer<IAccountDeletedEvent> {
  readonly topic: KafkaTopics.AccountDeleted = KafkaTopics.AccountDeleted;
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
