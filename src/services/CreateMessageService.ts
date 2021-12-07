import { api } from "./api";


export const CreateMessageService = {
  createMessage: async (message: string) => {
    await api.post('messages', {message})
  }
}