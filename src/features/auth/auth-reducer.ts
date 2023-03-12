import {authApi, UserResponseType} from './auth-api'
import {Dispatch} from 'redux'
import {AxiosError} from 'axios'
import ava from '../../assest/imgs/ava.png'
import {RootThunkType} from '../../app/store'
import {
  initializeAppAC,
  setAppStatusAC,
} from '../../app/app-reducer'
import {errorUtils} from "../../utils/error-utils";

const initialState: UserResponseType & { isLoggedIn: boolean; isRegistered: boolean, isSentInstruction: boolean } = {
  isSentInstruction: false,
  isRegistered: false,
  isLoggedIn: false,
  email: 'j&johnson@gmail.com',
  name: 'ivan',
  avatar: ava,
  publicCardPacksCount: 0,
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/SET-LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
        name: action.payload.name,
        avatar: action.payload.avatar,
        publicCardPacksCount: action.payload.publicCardPacksCount,
      }
    case 'AUTH/SET-LOGOUT':
      return {...state, isLoggedIn: false}
    case 'AUTH/SET-REGISTERED':
      return {...state, isRegistered: action.payload.isRegistered}
    case 'AUTH/UPD-USER-DATA':
      return {...state, name: action.payload.name, avatar: action.payload.avatar}
    case 'AUTH/SENT-INSTRUCTION':
      return {...state, isSentInstruction: action.payload.isSentInstruction}
    default:
      return state
  }
}

export const setLoginAC = (
  email: string,
  name: string,
  avatar: string = ava, // временно
  publicCardPacksCount: number
) => {
  return {
    type: 'AUTH/SET-LOGIN',
    payload: {
      email,
      name,
      avatar,
      publicCardPacksCount,
      isLoggedIn: true,
    },
  } as const
}
export const setLogoutAC = () => {
  return {
    type: 'AUTH/SET-LOGOUT',
  } as const
}
export const sentInstructionAC = (isSentInstruction: boolean) => {
  return {
    type: 'AUTH/SENT-INSTRUCTION',
    payload: {
      isSentInstruction,
    },
  } as const
}
export const setRegisteredAC = (isRegistered: boolean) => {
  return {
    type: 'AUTH/SET-REGISTERED',
    payload: {
      isRegistered,
    },
  } as const
}
export const updUserDataAC = (name: string, avatar: string) => {
  return {
    type: 'AUTH/UPD-USER-DATA',
    payload: {
      name,
      avatar,
    },
  } as const
}

export const initializeProfileTC = (): RootThunkType => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then(data => {
      if (data.name) {
        const {name, email, publicCardPacksCount, avatar} = data
        dispatch(setLoginAC(email, name, avatar, publicCardPacksCount))
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

export const loginTC = (email: string, password: string, rememberMe: boolean): RootThunkType => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi.login({email, password, rememberMe})
    .then((data) => {
      const {name, email, publicCardPacksCount, avatar} = data
      dispatch(setLoginAC(email, name, avatar, publicCardPacksCount))
      dispatch(setAppStatusAC('succeeded'))
    }).catch((err: AxiosError<{ error: string }>) => {
    errorUtils(err, dispatch);
  })
}

export const logoutTC = (): RootThunkType => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi.logout().then(() => {
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
      authApi.register({email, password}).then(() => {
        dispatch(setRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
    }

export const updUserDataTC =
  (name: string, avatar?: string): RootThunkType =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authApi.updateMe({name, avatar}).then(data => {
        const {name, avatar} = data.updatedUser
        dispatch(updUserDataAC(name, avatar ? avatar : ava))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
    }

export const forgotTC =
  (email: string): RootThunkType =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authApi.forgot(email).then(() => {
        dispatch(sentInstructionAC(true))
        dispatch(setAppStatusAC('succeeded'))
      }).catch((err: AxiosError<{ error: string }>) => {
        errorUtils(err, dispatch);
      })
    }
export const setNewPasswordTC = (password:string,resetPasswordToken:string) : RootThunkType =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.setNewPassword({password,
      resetPasswordToken}).then(() => {
      dispatch(setAppStatusAC('succeeded'))
    }).catch((err: AxiosError<{ error: string }>) => {
      errorUtils(err, dispatch);
    })
  }

type updUserDataACType = ReturnType<typeof updUserDataAC>
type setRegisteredACType = ReturnType<typeof setRegisteredAC>
type setLoginACType = ReturnType<typeof setLoginAC>
type sentInstructionACType = ReturnType<typeof sentInstructionAC>

export type AuthActionsType =
  | setLoginACType
  | setLogoutACType
  | updUserDataACType
  | setRegisteredACType
  | sentInstructionACType

type setLogoutACType = ReturnType<typeof setLogoutAC>



