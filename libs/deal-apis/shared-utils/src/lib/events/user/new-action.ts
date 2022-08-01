import { ACTION_TYPES, Subjects } from "../../types"

export interface INewActionEvent {
  subject: Subjects.NewAction
  data: {
    actionKey: string
    entities: { boardId: string; name?: string; [key: string]: any }
    type: ACTION_TYPES
    userId: string
  }
}
