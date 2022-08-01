import {
  IUserVerifiedEvent,
  Publisher,
  Subjects,
} from '@loxodonta/deal-apis/shared-utils';

export class UserVerifiedPublisher extends Publisher<IUserVerifiedEvent> {
  subject: Subjects.UserVerified = Subjects.UserVerified;
}
