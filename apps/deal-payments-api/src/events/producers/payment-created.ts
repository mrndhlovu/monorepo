import {
  IPaymentCreatedEvent,
  KAFKA_TOPICS,
  Producer,
} from '@loxodonta/deal-apis/shared-utils';

export class PaymentCreatedProducer extends Producer<IPaymentCreatedEvent> {
  topic: KAFKA_TOPICS.PaymentCreated = KAFKA_TOPICS.PaymentCreated;
}
