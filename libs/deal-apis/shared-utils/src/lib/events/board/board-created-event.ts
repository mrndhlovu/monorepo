import { Subjects } from "../../types"

export interface IBoardCreatedEvent {
  subject: Subjects.BoardCreated
  data: {
    id: string
    ownerId: string
  }
}
