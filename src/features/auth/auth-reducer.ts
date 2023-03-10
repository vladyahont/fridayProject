import {authApi, UserResponseType} from './auth-api'
import {Dispatch} from 'redux'
import {AxiosError, AxiosResponse} from 'axios'
import ava from '../../assest/imgs/ava.png'
import {RootThunkType} from '../../app/store'
import {
  initializeAppAC,
  setAppStatusAC,
} from '../../app/app-reducer'
import {errorUtils} from "../../utils/error-utils";

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
const SET_REGISTERED = 'AUTH/SET_REGISTERED'
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
      return {...state, isLoggedIn: false}
    case SET_REGISTERED:
      return {...state, isRegistered: action.payload.isRegistered}
    case UPD_USER_DATA:
      return {...state, name: action.payload.name, avatar: action.payload.avatar}

    default:
      return state
  }
}
type updUserDataACType = ReturnType<typeof updUserDataAC>
type setRegisteredACType = ReturnType<typeof setRegisteredAC>
type setLoginACType = ReturnType<typeof setLoginAC>

export type AuthActionsType =
  | setLoginACType
  | setLogoutACType
  | updUserDataACType
  | setRegisteredACType

export const initializeProfileTC = (): RootThunkType => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then(res => {
      if (res.data.name) {
        const {name, email, _id, publicCardPacksCount, avatar} = res.data
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

export const loginTC =
  (email: string, password: string, rememberMe: boolean): RootThunkType =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authApi.logIn(email, password, rememberMe)
        .then((res: AxiosResponse<UserResponseType, any>) => {
          const {name, email, _id, publicCardPacksCount, avatar} = res.data
          dispatch(setLoginAC(_id, email, name, avatar, publicCardPacksCount))
          dispatch(setAppStatusAC('succeeded'))
        }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
    }

export const logoutTC = (): RootThunkType => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi.logout().then(res => {
    dispatch(setLogoutAC())
    dispatch(setAppStatusAC('succeeded'))
  }).catch((err: AxiosError<{ error: string }>) => {
    errorUtils(err, dispatch);
  })
}
export const registerTC =
  (email: string, password: string): RootThunkType =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authApi.register(email, password).then(res => {
        /*alert(JSON.stringify(res.data.addedUser))*/
        dispatch(setRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
    }

export const updUserDataTC =
  (name: string, avatar?: string): RootThunkType =>
    (dispatch: Dispatch) =>{
      dispatch(setAppStatusAC('loading'))
      authApi.updateMe(name, avatar).then(res => {
        const {name, avatar} = res.data.updatedUser
        dispatch(updUserDataAC(name, avatar ? avatar : ava))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
}

export const updUserDataAC = (name: string, avatar: string) => {
  return {
    type: UPD_USER_DATA,
    payload: {
      name,
      avatar,
    },
  } as const
}
export const setRegisteredAC = (isRegistered: boolean) => {
  return {
    type: SET_REGISTERED,
    payload: {
      isRegistered,
    },
  } as const
}

type setLogoutACType = ReturnType<typeof setLogoutAC>
export const setLogoutAC = () => {
  return {
    type: SET_LOGOUT,
  } as const
}
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
