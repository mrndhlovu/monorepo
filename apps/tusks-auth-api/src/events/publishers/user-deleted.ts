import {
  IUserDeletedEvent,
  Publisher,
  Subjects,
} from '@loxodonta/tusks-apis/shared-utils';

export class UserDeletedPublisher extends Publisher<IUserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
}
