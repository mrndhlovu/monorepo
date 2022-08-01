import { Subjects } from "../../types"

export interface IBoardViewedEvent {
  subject: Subjects.BoardViewed
  data: {
    userId: string
    boardId: string
  }
}
