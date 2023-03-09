import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/auth-reducer'

import { AppActionsType, appReducer } from './app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type RootActionType = AppActionsType | AuthActionsType

export type RootThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  RootActionType
>

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, RootActionType>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
