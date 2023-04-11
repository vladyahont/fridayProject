import {AppStateType} from "../../app/store";

export const showEditModalSelector = (state: AppStateType) => state.modal.modalsStatus.isEdit
export const showDeleteModalSelector = (state: AppStateType) => state.modal.modalsStatus.isDelete
export const showAddModalSelector = (state: AppStateType) => state.modal.modalsStatus.isAdd
export const modalDataSelector = (state: AppStateType) => state.modal.modalData

