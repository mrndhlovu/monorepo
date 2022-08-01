import { Subjects } from "../../types"
import { IBoardCreatedEvent } from "./board-created-event"

export interface IBoardUpdatedEvent {
  subject: Subjects.BoardUpdated
  data: IBoardCreatedEvent["data"]
}
