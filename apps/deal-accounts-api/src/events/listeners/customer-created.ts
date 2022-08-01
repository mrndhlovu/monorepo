import { Message } from 'node-nats-streaming';

import {
  ICustomerCreated,
  Consumer,
  queueGroupNames,
  KafkaTopics,
  kafkaService,
  SendEmailPublisher,
} from '@loxodonta/deal-apis/shared-utils';

import { accountService } from '../../services';
import { AccountUpdatedPublisher } from '../publishers';
import { DEFAULT_EMAIL } from '../../utils/constants';

export class CustomerCreatedListener extends Consumer<ICustomerCreated> {
  readonly topic: KafkaTopics.CustomerCreated = KafkaTopics.CustomerCreated;
  queueGroupName = queueGroupNames.PAYMENTS_QUEUE_GROUP;

  handleEachMessage = async (data: ICustomerCreated['data']) => {
    console.log('Event data ', data);

    try {
      data.forEach(async (option) => {
        const account = await accountService.findAccountByIdAndUpdate(
          {
            customerId: option.customerId,
          },
          option.userId
        );

        if (account) {
          await account.save();
          const eventData = accountService.getEventData(account);
          new AccountUpdatedPublisher(kafkaService.client).publish(eventData);
        }
      });
    } catch (error) {
      return error;
    }
  };
}
