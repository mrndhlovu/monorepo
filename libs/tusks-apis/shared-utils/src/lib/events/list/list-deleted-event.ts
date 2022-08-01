import { Subjects } from "../../types"

export interface IListDeletedEvent {
  subject: Subjects.ListDeleted
  data: {
    id: string
    boardId: string
  }
}
