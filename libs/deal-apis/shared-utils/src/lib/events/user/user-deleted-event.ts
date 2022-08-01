import { IEventUserData, Subjects } from "../../types"

interface UserData extends IEventUserData {
  email: string
  boardIds: string[]
}

export interface IUserDeletedEvent {
  subject: Subjects.UserDeleted
  data: UserData
}
