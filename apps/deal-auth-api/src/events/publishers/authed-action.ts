import {
  IAuthedActionEvent,
  Publisher,
  Subjects,
} from '@loxodonta/deal-apis/shared-utils';

export class AuthedActionPublisher extends Publisher<IAuthedActionEvent> {
  subject: Subjects.AuthedAction = Subjects.AuthedAction;
}
