import {
  ICustomerCreated,
  KafkaTopics,
  Producer,
} from '@loxodonta/deal-apis/shared-utils';

export class CustomerCreatedProducer extends Producer<ICustomerCreated> {
  topic: KafkaTopics.CustomerCreated = KafkaTopics.CustomerCreated;
}
