import { api } from "./api";

import {IAuthResponse} from '../dtos/AuthResponse'

export const AuthenticateService = {
  authenticateUser: async (githubCode:string) => {
    let res = await api.post<IAuthResponse>('authenticate', {
      code: githubCode
    })
    let tokenAndUserInfo = res.data
    return tokenAndUserInfo
  }
}