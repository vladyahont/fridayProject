import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from 'features/auth/auth-reducer'

import { AppActionsType, appReducer } from './app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {PacksActionsType, packsReducer} from "features/packs/packs-reducer";
import {CardsActionsType, cardsReducer} from "features/packs/cards/cards-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type RootActionType = AppActionsType | AuthActionsType | PacksActionsType | CardsActionsType

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

// @ts-ignore
window.store = store;