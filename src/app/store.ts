import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'

import {AuthActionsType, authReducer} from '../features/auth/auth-reducer'

import {AppActionsType, appReducer} from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})


export type AppStateType = ReturnType<typeof rootReducer>

export type RootActionType = AppActionsType | AuthActionsType

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionType>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
