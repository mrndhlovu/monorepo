import { Message } from 'node-nats-streaming';

import {
  ICustomerCreated,
  Consumer,
  CONSUMER_GROUPS,
  KAFKA_TOPICS,
  kafkaService,
  SendEmailProducer,
} from '@loxodonta/deal-apis/shared-utils';

import { accountService } from '../../services';
import { AccountUpdatedProducer } from '../producers';
import { DEFAULT_EMAIL } from '../../utils/constants';

export class CustomerCreatedConsumer extends Consumer<ICustomerCreated> {
  readonly topic: KAFKA_TOPICS.CustomerCreated = KAFKA_TOPICS.CustomerCreated;
  groupId = CONSUMER_GROUPS.PAYMENTS;

  handleEachMessage = async ({ message }) => {
    const data = JSON.parse(message.value) as ICustomerCreated['data'];
    console.log('EVENT RECEIVED====> ', data);

    try {
      const account = await accountService.findAccountByIdAndUpdate(
        {
          customerId: data.customerId,
        },
        data.accountId
      );

      if (account) {
        await account.save();
        const eventData = accountService.getEventData(account);
        await new AccountUpdatedProducer(kafkaService.client).publish(
          eventData
        );
      }
    } catch (error) {
      return error;
    }
  };
}
