import {
  IUserCreatedEvent,
  Publisher,
  Subjects,
} from '@loxodonta/tusks-apis/shared-utils';

export class UserCreatedPublisher extends Publisher<IUserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
