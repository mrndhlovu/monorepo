import { INewPayment, KAFKA_TOPICS } from '../../types';

export interface IPaymentCreatedEvent {
  topic: KAFKA_TOPICS.PaymentCreated;
  data: INewPayment;
}

export interface IPaymentFailedEvent {
  topic: KAFKA_TOPICS.PaymentCreated;
  data: {
    productId?: string;
    customerId: string;
    ownerId: string;
    orderId: string;
  };
}
