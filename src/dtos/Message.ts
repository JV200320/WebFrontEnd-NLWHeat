import {IUser} from './User'

export interface IMessage {
  created_at: string,
  id: string,
  text: string,
  user_id: string,
  user: IUser
}