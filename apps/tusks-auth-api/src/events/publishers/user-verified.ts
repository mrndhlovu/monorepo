import {
  IUserVerifiedEvent,
  Publisher,
  Subjects,
} from '@loxodonta/tusks-apis/shared-utils';

export class UserVerifiedPublisher extends Publisher<IUserVerifiedEvent> {
  subject: Subjects.UserVerified = Subjects.UserVerified;
}
