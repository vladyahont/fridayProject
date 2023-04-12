import {ModalDataType, ModalStatusType} from "./modalTypes";

const initialState = {
  modalData: {
    _id: '',
    name: '',
  },
  modalsStatus: {
    isEdit: false,
    isDelete: false,
    isAdd: false,
  }
}

type InitialStateType = {
  modalData: ModalDataType,
  modalsStatus: Partial<ModalStatusType>
}

export const modalReducer = (
  state: InitialStateType = initialState,
  action: ModalActionsType
): InitialStateType => {
  switch (action.type) {
    case 'MODAL/SET-DATA':
      return {
        ...state, modalData: action.payload.newData
      }
    case  'MODAL/RESET-DATA':
      return {
        ...initialState,
      }
    case 'MODAL/SET-STATUS':
      return {
        ...state,
        modalsStatus: action.payload.newStatus
      }
    default:
      return state
  }
}

export type SwitchModalActionType = ReturnType<typeof switchModalAC>
export type ResetDataModalActionType = ReturnType<typeof resetDataModalAC>
export type SetDataModalActionType = ReturnType<typeof setDataModalAC>

export type ModalActionsType =
  | SwitchModalActionType
  | ResetDataModalActionType
  | SetDataModalActionType

export const switchModalAC = (data:  Partial<ModalStatusType>) => ({
  type: 'MODAL/SET-STATUS',
  payload: {
    newStatus: data,
  },
} as const)
export const setDataModalAC = (data: ModalDataType) => ({
  type: 'MODAL/SET-DATA',
  payload: {
    newData: data,
  },
} as const)
export const resetDataModalAC = () => ({
  type: 'MODAL/RESET-DATA',
} as const)