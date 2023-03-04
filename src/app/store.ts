import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
