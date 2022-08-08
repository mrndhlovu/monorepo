import {
  ICustomerCreated,
  KAFKA_TOPICS,
  Producer,
} from '@loxodonta/deal-apis/shared-utils';

export class CustomerCreatedProducer extends Producer<ICustomerCreated> {
  topic: KAFKA_TOPICS.CustomerCreated = KAFKA_TOPICS.CustomerCreated;
}
