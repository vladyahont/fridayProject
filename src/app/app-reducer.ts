export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  isInitialized: false,
  appStatus: 'idle' as RequestStatusType,
  appError: null as string | null,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
      return {
        ...state,
        appStatus: action.payload.appStatus,
      }
    case 'APP/SET-INITIALIZE':
      return {
        ...state,
        isInitialized: true,
      }
      case 'APP/SET_APP_ERROR':
      return {
        ...state,
        appError: action.payload.appError,
      }
    default:
      return state
  }
}

export const setAppStatusAC = (newStatus: RequestStatusType) =>
  ({
    type: 'APP/SET-APP-STATUS',
    payload: {
      appStatus: newStatus,
    },
  } as const)
export const initializeAppAC = () =>
  ({
    type: 'APP/SET-INITIALIZE',
  } as const)
export const setAppErrorAC = (errorMessage: string | null) =>
  ({
    type: 'APP/SET_APP_ERROR',
    payload: {
      appError: errorMessage,
    },
  } as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type initializeAppActionType = ReturnType<typeof initializeAppAC>
export type setAppErrorACActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType =
  | SetAppStatusActionType
  | setAppErrorACActionType
  | initializeAppActionType
