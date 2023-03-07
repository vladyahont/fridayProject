import { authApi, UserResponseType } from './auth-api'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'

const initialState: UserResponseType & { isLoggedIn: boolean } = {
  isLoggedIn: false,
  _id: '',
  email: 'j&johnson@gmail.com',
  name: 'ivan',
  avatar: '',
  publicCardPacksCount: 0, // количество колод

  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
}

type InitialStateType = typeof initialState

const SET_LOGIN = 'SET-LOGIN'

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET-LOGIN':
      const data = action.payload.data
      return { ...state, ...data }
    default:
      return state
  }
}

type ActionsType = setLoginACType

type setLoginACType = ReturnType<typeof setLoginAC>
export const setLoginAC = (data: UserResponseType & { isLoggedIn: boolean }) => {
  return {
    type: SET_LOGIN,
    payload: {
      data,
    },
  } as const
}

export const setLoginTC =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    return authApi
      .logIn(email, password, rememberMe)
      .then((res: AxiosResponse<UserResponseType, any>) => {
        const { ...data } = res.data
        dispatch(setLoginAC({ ...data, isLoggedIn: true }))
      })
  }
