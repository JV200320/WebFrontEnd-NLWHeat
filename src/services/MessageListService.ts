import { IMessage } from "../dtos/Message";
import { api } from "./api";

export const MessageListService = {
  get3LastMessages: async () => {
    let res = await api.get<IMessage[]>('messages/last3')
    let messages = res.data
    return messages
  }
}