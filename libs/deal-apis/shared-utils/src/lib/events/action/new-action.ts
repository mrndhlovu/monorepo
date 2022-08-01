import { INewActionEvent } from "../user/new-action"
import { Publisher } from "../../services/base-publisher"
import { Subjects } from "../../types"

export class NewActionPublisher extends Publisher<INewActionEvent> {
  subject: Subjects.NewAction = Subjects.NewAction
}
