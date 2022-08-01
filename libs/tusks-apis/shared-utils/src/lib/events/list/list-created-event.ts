import { Subjects } from "../../types"

export interface IListCreatedEvent {
  subject: Subjects.ListCreated
  data: {
    id: string
    boardId: string
  }
}
