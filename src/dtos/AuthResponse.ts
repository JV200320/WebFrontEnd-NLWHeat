import { IUser } from "./User";

export interface IAuthResponse {
  token: string,
  user: IUser
}