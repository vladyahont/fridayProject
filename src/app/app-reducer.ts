export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppStatusType = RequestStatusType

const initialState = {
  isInitialized: false,
  appStatus: 'idle' as AppStatusType,
  appError: null as string | null,
}

type InitialStateType = typeof initialState

// Types of action constants
const SET_APP_STATUS = 'APP/SET_APP_STATUS'
const SET_INITIALIZE = 'APP/SET_INITIALIZE'
const SET_APP_ERROR = 'APP/SET_APP_ERROR'

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_APP_STATUS:
      return {
        ...state,
        appStatus: action.payload.appStatus,
      }
    case SET_INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      }
    case SET_APP_ERROR:
      return {
        ...state,
        appError: action.payload.appError,
      }
    default:
      return state
  }
}

export const setAppStatusAC = (newStatus: AppStatusType) =>
  ({
    type: SET_APP_STATUS,
    payload: {
      appStatus: newStatus,
    },
  } as const)
export const initializeAppAC = () =>
  ({
    type: SET_INITIALIZE,
  } as const)
export const setAppErrorAC = (errorMessage: string | null) =>
  ({
    type: SET_APP_ERROR,
    payload: {
      appError: errorMessage,
    },
  } as const)

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type initializeAppActionType = ReturnType<typeof initializeAppAC>
type setAppErrorACActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType =
  | SetAppStatusActionType
  | setAppErrorACActionType
  | initializeAppActionType
