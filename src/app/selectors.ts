import { AppStateType } from './store'

/* --- App-reducer selectors --- */
export const appStatusSelector = (state: AppStateType) => state.app.appStatus
export const isInitializedSelector = (state: AppStateType) => state.app.isInitialized

/* --- Auth-reducer selectors --- */
export const isRegisteredSelector = (state: AppStateType) => state.auth.isRegistered
export const isLoggedInSelector = (state: AppStateType) => state.auth.isLoggedIn
export const userNameSelector = (state: AppStateType) => state.auth.name
export const userAvatarSelector = (state: AppStateType) => state.auth.avatar
export const userEmailSelector = (state: AppStateType) => state.auth.email
