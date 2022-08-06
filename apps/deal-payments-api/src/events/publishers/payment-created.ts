import {
  IPaymentCreatedEvent,
  KafkaTopics,
  Producer,
} from '@loxodonta/deal-apis/shared-utils';

export class PaymentCreatedProducer extends Producer<IPaymentCreatedEvent> {
  topic: KafkaTopics.PaymentCreated = KafkaTopics.PaymentCreated;
}
