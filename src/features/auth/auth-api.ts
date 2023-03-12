import { instance } from '../../app/instance'
import {AxiosResponse} from "axios";

//<'',AxiosResponse<UserResponseType>,''>
export const authApi = {
  me() {
    return instance.post<UserResponseType>(`auth/me`).then(res=>res.data)
  },
  updateMe(data:UpdateUserDataType) {
    return instance.put<any,AxiosResponse<UpdateUserResponseType>,UpdateUserDataType>(`auth/me`, data).then(res=>res.data)
  },
  login(data:LoginDataType) {
    return instance.post<any,AxiosResponse<UserResponseType>,LoginDataType>(`auth/login`, data).then(res=>res.data)
  },
  logout() {
    return instance.delete<InfoResponseType>(`auth/me`).then(res=>res.data)
  },
  register(data:RegisterDataType) {
    return instance.post<any,AxiosResponse<RegisterResponseType>,RegisterDataType>(`auth/register`, data).then(res=>res.data)
  },

}

type RegisterDataType = Omit<LoginDataType, "rememberMe">
type LoginDataType = {
  email: string,
  password: string,
  rememberMe: boolean
}
type UpdateUserDataType ={
  name: string,
  avatar?: string
}
type UpdateUserResponseType = {
  updatedUser: UserResponseType
  error?: string
}

type RegisterResponseType =  Omit<UpdateUserResponseType, "updatedUser"> & { "addedUser":UpdateUserResponseType["updatedUser"]}
type InfoResponseType = {
  info: string
  error: string
}
export type UserResponseType = {
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
}
