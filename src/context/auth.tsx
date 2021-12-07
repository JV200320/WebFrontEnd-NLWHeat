import React from "react";
import { IUser } from "../dtos/User";
import { api } from "../services/api";

import { AuthenticateService } from '../services/AuthenticateService'
import { ProfileService } from "../services/ProfileService";

interface AuthContextData {
  user: IUser | null,
  signInUrl: string,
  signOut: () => void
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = React.useState<IUser | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=531bd79ad5286cf27231`

  React.useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')
      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }
  }, [])

  React.useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      ProfileService.getProfile(token)
        .then(res => setUser(res))
    }
  }, [])

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  async function signIn(githubCode: string) {
    const res = await AuthenticateService.authenticateUser(githubCode)
    const { token, user } = res

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}