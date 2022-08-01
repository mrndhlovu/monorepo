import { Subjects } from "../../types"
import { IBoardCreatedEvent } from "./board-created-event"

export interface IBoardDeletedEvent {
  subject: Subjects.BoardDeleted
  data: IBoardCreatedEvent["data"]
}
