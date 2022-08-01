import { Subjects } from "../../types"
import { IBoardCreatedEvent } from "./board-created-event"

export interface IGetBoardListEvent {
  subject: Subjects.GetBoards
  data: IBoardCreatedEvent["data"][]
}
