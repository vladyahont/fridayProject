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

export const authReducer = (
    state: InitialStateType = initialState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                _id: action.payload._id,
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

        default:
            return state
    }
}

export const setLoginAC = (
    _id: string,
    email: string,
    name: string,
    avatar: string = ava, // временно
    publicCardPacksCount: number
) => {
    return {
        type: 'AUTH/SET-LOGIN',
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
export const setLogoutAC = () => {
    return {
        type: 'AUTH/SET-LOGOUT',
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

export const initializeProfileTC = (): RootThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.me()
        const {name, email, _id, publicCardPacksCount, avatar} = res.data
        dispatch(setLoginAC(_id, email, name, avatar, publicCardPacksCount))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(initializeAppAC())
    } catch (err) {
        dispatch(setAppStatusAC('failed'))
        dispatch(initializeAppAC())
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): RootThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authApi.logIn(email, password, rememberMe)
            const {name, _id, publicCardPacksCount, avatar} = res.data
            dispatch(setLoginAC(_id, email, name, avatar, publicCardPacksCount))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err: unknown) {
            dispatch(setAppStatusAC('failed'))
            if (err instanceof AxiosError) {
                if (err.response) {
                    errorUtils(err.response.data.error, dispatch)
                }
            }
        }
    }
}

export const logoutTC = (): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.logout()
        dispatch(setLogoutAC())
        dispatch(setAppStatusAC('succeeded'))
    } catch (err: unknown) {
        dispatch(setAppStatusAC('failed'))
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
    }
}
export const registerTC = (email: string, password: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.register(email, password)
        dispatch(setRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err: unknown) {
        dispatch(setAppStatusAC('failed'))
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
    }
}

export const updUserDataTC = (name: string, avatar?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
       const res = await authApi.updateMe(name, avatar)
        if (res.data.updatedUser) {
            const {name, avatar} = res.data.updatedUser
            dispatch(updUserDataAC(name, avatar ? avatar : ava))
            dispatch(setAppStatusAC('succeeded'))
        }
    } catch (err: unknown) {
        dispatch(setAppStatusAC('failed'))
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
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

type setLogoutACType = ReturnType<typeof setLogoutAC>


