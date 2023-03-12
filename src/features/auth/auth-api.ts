import { instance } from '../../app/instance'

export const authApi = {
  me() {
    return instance.post<UserResponseType>(`auth/me`, {})
  },
  updateMe(
    name: string,
    avatar?: string // url or base64
  ) {
    return instance.put<{ updatedUser: UserResponseType; error?: string }>(`auth/me`, {
      name,
      avatar,
    })
  },
  logIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<UserResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
    })
  },
  logout() {
    return instance.delete<InfoResponseType>(`auth/me`)
  },
  register(email: string, password: string) {
    return instance.post<RegisterResponseType>(`auth/register`, {
      email,
      password,
    })
  },
}

export type RegisterResponseType = {
  addedUser: {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
  }
  error?: string
}
type InfoResponseType = {
  info: string
  error: string
}
export type UserResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}
