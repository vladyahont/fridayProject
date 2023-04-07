import {AppStateType} from './store'

/* --- App-reducer selectors --- */
export const appStatusSelector = (state: AppStateType) => state.app.appStatus
export const isInitializedSelector = (state: AppStateType) => state.app.isInitialized
export const appErrorSelector = (state: AppStateType) => state.app.appError

/* --- Auth-reducer selectors --- */
export const isRegisteredSelector = (state: AppStateType) => state.auth.isRegistered
export const isSentInstructionSelector = (state: AppStateType) => state.auth.isSentInstruction
export const isLoggedInSelector = (state: AppStateType) => state.auth.isLoggedIn
export const userNameSelector = (state: AppStateType) => state.auth.name
export const userAvatarSelector = (state: AppStateType) => state.auth.avatar
export const userEmailSelector = (state: AppStateType) => state.auth.email
export const userIdSelector = (state: AppStateType) => state.auth._id

