export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppStatusType = RequestStatusType

const initialState = {
  isInitialized:false,
  appStatus: 'idle' as AppStatusType,
  appError: null as string | null,
}

type InitialStateType = typeof initialState
export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_APP_STATUS':
      return {
        ...state,
        appStatus: action.appStatus,
      }
    case 'APP/SET_INITIALIZE':
      return {
        ...state,
        isInitialized: true,
      }
    case 'APP/SET_APP_ERROR':
      return {
        ...state,
        appError: action.appError,
      }
    default:
      return state
  }
}

export const setAppStatusAC = (newStatus: AppStatusType) =>
  ({
    type: 'APP/SET_APP_STATUS',
    appStatus: newStatus,
  } as const)
export const initializeAppAC = () =>
  ({
    type: 'APP/SET_INITIALIZE',
  } as const)
export const setAppErrorAC = (errorMessage: string | null) =>
  ({
    type: 'APP/SET_APP_ERROR',
    appError: errorMessage,
  } as const)


type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
 export  type initializeAppActionType = ReturnType<typeof initializeAppAC>
type setAppErrorACActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType =
  SetAppStatusActionType |
  setAppErrorACActionType |
  initializeAppActionType
