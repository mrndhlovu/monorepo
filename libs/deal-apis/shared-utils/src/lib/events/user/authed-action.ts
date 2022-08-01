import { ACTION_TYPES, IEventUserData, Subjects } from "../../types"

interface UserData extends IEventUserData {
  username: string
  fullName?: string
  initials: string
}

export interface IAuthedActionEvent {
  subject: Subjects.AuthedAction
  data: {
    actionKey: string
    entities: { [key: string]: any }
    type: ACTION_TYPES
    user: UserData
  }
}
