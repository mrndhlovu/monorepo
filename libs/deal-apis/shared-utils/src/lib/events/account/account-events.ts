import { IAccountFields, KafkaTopics } from '../../types';

export interface IAccountCreatedEvent {
  topic: KafkaTopics.AccountCreated;
  data: IAccountFields;
}

export interface ICustomerCreated {
  topic: KafkaTopics.CustomerCreated;
  data: {
    userId: string;
    customerId: string;
    accountId: string;
  };
}

export interface ICustomerDeleted {
  topic: KafkaTopics.CustomerDeleted;
  data: {
    userId: string;
    customerId: string;
  };
}

export interface IAccountUpdatedEvent {
  topic: KafkaTopics.AccountUpdated;
  data: IAccountFields;
}

export interface IAccountDeletedEvent {
  topic: KafkaTopics.AccountDeleted;
  data: {
    email: string;
    userId: string;
  };
}
