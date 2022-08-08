import { IAccountFields, KAFKA_TOPICS } from '../../types';

export interface IAccountCreatedEvent {
  topic: KAFKA_TOPICS.AccountCreated;
  data: IAccountFields;
}

export interface ICustomerCreated {
  topic: KAFKA_TOPICS.CustomerCreated;
  data: {
    userId: string;
    customerId: string;
    accountId: string;
  };
}

export interface ICustomerDeleted {
  topic: KAFKA_TOPICS.CustomerDeleted;
  data: {
    userId: string;
    customerId: string;
  };
}

export interface IAccountUpdatedEvent {
  topic: KAFKA_TOPICS.AccountUpdated;
  data: IAccountFields;
}

export interface IAccountDeletedEvent {
  topic: KAFKA_TOPICS.AccountDeleted;
  data: {
    email: string;
    userId: string;
  };
}
