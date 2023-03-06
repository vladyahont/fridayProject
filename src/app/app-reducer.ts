
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppStatusType = RequestStatusType

const initialState = {
  appStatus: 'loading' as AppStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET_APP_STATUS":
      return {
        ...state,appStatus: action.appStatus
      }
    default:
      return state
  }
}
export type AppActionsType =  SetAppStatusActionType
export const setAppStatusAC = (newStatus:AppStatusType) => ({
  type: "APP/SET_APP_STATUS",appStatus: newStatus} as const)

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>




