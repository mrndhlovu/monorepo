import {
  IEmailEvent,
  Publisher,
  Subjects,
} from '@loxodonta/deal-apis/shared-utils';

export class SendEmailPublisher extends Publisher<IEmailEvent> {
  subject: Subjects.Email = Subjects.Email;
}
