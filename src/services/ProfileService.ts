import { IUser } from "../dtos/User";
import { api } from "./api";

export const ProfileService = {
  getProfile: async (token: string) => {
    api.defaults.headers.common.authorization = `Bearer ${token}`

    let res = await api.get<IUser>('profile')
    let user = res.data
    return user
  }
}