import { INewPayment, KafkaTopics } from '../../types';

export interface IPaymentCreatedEvent {
  topic: KafkaTopics.PaymentCreated;
  data: INewPayment;
}

export interface IPaymentFailedEvent {
  topic: KafkaTopics.PaymentCreated;
  data: {
    productId?: string;
    customerId: string;
    ownerId: string;
    orderId: string;
  };
}
