import { authApi, UserResponseType } from './auth-api'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import ava from '../../assest/imgs/ava.png'
import { RootActionType, RootThunkType } from '../../app/store'
import {
  AppActionsType,
  initializeAppAC,
  initializeAppActionType,
  setAppStatusAC,
} from '../../app/app-reducer'

const initialState: UserResponseType & { isLoggedIn: boolean; isRegistered: boolean } = {
  isRegistered: false,
  isLoggedIn: false,

  _id: '',
  email: 'j&johnson@gmail.com',
  name: 'ivan',
  avatar: ava,
  publicCardPacksCount: 0, // количество колод

  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
}

type InitialStateType = typeof initialState

// Types of action constants
const SET_LOGIN = 'AUTH/SET_LOGIN'
const SET_LOGOUT = 'AUTH/SET_LOGOUT'
const UPD_USER_DATA = 'AUTH/UPD_USER_DATA'

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        avatar: action.payload.avatar,
        publicCardPacksCount: action.payload.publicCardPacksCount,
      }
    case SET_LOGOUT:
      return { ...state, isLoggedIn: false }
    case UPD_USER_DATA:
      return { ...state, name: action.payload.name, avatar: action.payload.avatar }

    default:
      return state
  }
}

export type AuthActionsType = setLoginACType | setLogoutACType | updUserDataACType

/* --- INITIALIZE PROFILE --- */

export const initializeProfileTC = (): RootThunkType => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then(res => {
      if (res.data.name) {
        const { name, email, _id, publicCardPacksCount, avatar } = res.data
        dispatch(setLoginAC(_id, email, name, avatar, publicCardPacksCount))
      }
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(reason => {
      console.log(reason)
      dispatch(setAppStatusAC('failed'))
    })
    .finally(() => {
      dispatch(initializeAppAC())
    })
}

/* --- LOGIN --- */

type setLoginACType = ReturnType<typeof setLoginAC>

// пока данных хватит
export const setLoginAC = (
  _id: string,
  email: string,
  name: string,
  avatar: string = ava, // временно
  publicCardPacksCount: number
) => {
  return {
    type: SET_LOGIN,
    payload: {
      _id,
      email,
      name,
      avatar,
      publicCardPacksCount,
      isLoggedIn: true,
    },
  } as const
}

export const setLoginTC =
  (email: string, password: string, rememberMe: boolean): RootThunkType =>
  (dispatch: Dispatch) => {
    return authApi
      .logIn(email, password, rememberMe)
      .then((res: AxiosResponse<UserResponseType, any>) => {
        const { name, email, _id, publicCardPacksCount, avatar } = res.data
        dispatch(setLoginAC(_id, email, name, avatar, publicCardPacksCount))
      })
  }

/* --- LOGOUT --- */

type setLogoutACType = ReturnType<typeof setLogoutAC>
export const setLogoutAC = () => {
  return {
    type: SET_LOGOUT,
  } as const
}

export const logoutTC = (): RootThunkType => (dispatch: Dispatch) => {
  return authApi.logout().then(res => {
    dispatch(setLogoutAC())
  })
}

/* --- REGISTER --- */

export const registerTC =
  (email: string, password: string): RootThunkType =>
  (dispatch: Dispatch) => {
    authApi.register(email, password).then(res => {
      alert(JSON.stringify(res.data.addedUser))
    })
  }

/* --- UPDATE USER --- */

type updUserDataACType = ReturnType<typeof updUserDataAC>
export const updUserDataAC = (name: string, avatar: string) => {
  return {
    type: UPD_USER_DATA,
    payload: {
      name,
      avatar,
    },
  } as const
}

export const updUserDataTC =
  (name: string, avatar?: string): RootThunkType =>
  (dispatch: Dispatch) =>
    authApi.updateMe(name, avatar).then(res => {
      const { name, avatar } = res.data.updatedUser
      dispatch(updUserDataAC(name, avatar ? avatar : ava))
    })
