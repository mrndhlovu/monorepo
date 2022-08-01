import { Subjects } from "../../types"

export interface IListUpdatedEvent {
  subject: Subjects.ListUpdated
  data: {
    id: string
    boardId: string
  }
}
