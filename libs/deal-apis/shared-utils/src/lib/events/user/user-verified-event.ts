import { IEventUserData, Subjects } from "../../types"

export interface IUserVerifiedEvent {
  subject: Subjects.UserVerified
  data: IEventUserData
}
