import {
  IUserDeletedEvent,
  Consumer,
  CONSUMER_GROUPS,
  KAFKA_TOPICS,
  kafkaService,
} from '@loxodonta/deal-apis/shared-utils';
import Account from '../../models/Account';
import { AccountDeletedProducer } from '../producers';

export class UserDeletedConsumer extends Consumer<IUserDeletedEvent> {
  readonly topic: KAFKA_TOPICS.UserDeleted = KAFKA_TOPICS.UserDeleted;
  groupId = CONSUMER_GROUPS.ACCOUNT;

  handleEachMessage = async ({ message }) => {
    const data = JSON.parse(message.value) as IUserDeletedEvent['data'];
    console.log('EVENT RECEIVED====> ', data);

    try {
      const account = await Account.findOne({ userId: data.id });

      if (account) {
        const eventData = { email: data.email, userId: account.userId };

        await account.delete();

        await new AccountDeletedProducer(kafkaService.client).publish(
          eventData
        );
      }
    } catch (error) {
      return error;
    }
  };
}
