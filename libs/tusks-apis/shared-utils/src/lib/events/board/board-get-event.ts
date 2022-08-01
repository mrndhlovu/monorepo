import { Subjects } from "../../types"
import { IBoardCreatedEvent } from "./board-created-event"

export interface IGetBoardEvent {
  subject: Subjects.GetBoardById
  data: IBoardCreatedEvent["data"]
}
