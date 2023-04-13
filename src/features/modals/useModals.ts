import {useAppDispatch, useAppSelector} from "../../app/store";
import {resetDataModalAC, setDataModalAC, switchModalAC} from "./modaReduser";
import {ModalDataType} from "./modalTypes";
import {modalDataSelector, showAddModalSelector, showDeleteModalSelector, showEditModalSelector} from "./modalSelector";


export const useModals = () => {
  const dispatch = useAppDispatch()
  const modalData = useAppSelector(modalDataSelector)

  const isEdit = useAppSelector(showEditModalSelector) || false
  const isAdd = useAppSelector(showAddModalSelector) || false
  const isDelete = useAppSelector(showDeleteModalSelector) || false
  const showModal = (type: "edit" | "delete" | "add", data: Partial<ModalDataType>) => {
    return () => {
      switch (type) {
        case 'edit': {
          dispatch(switchModalAC({isEdit: true}))
          dispatch(setDataModalAC(data))
          return
        }
        case 'delete': {
          dispatch(switchModalAC({isDelete: true}))
          dispatch(setDataModalAC(data))
          return;
        }
        case 'add': {
          dispatch(switchModalAC({isAdd: true}))
          dispatch(setDataModalAC(data))
          return;
        }
      }
    }

  }
  const setDeckCover = (file64: string) => {
    dispatch(setDataModalAC({...modalData, deckCover: file64}))
  }
  const closeModal = () => {
    dispatch(resetDataModalAC())
  }

  return (
    {
      modalData: {...modalData, _id: modalData._id as string},
      isEdit,
      isAdd,
      isDelete
      , closeModal, showModal, setDeckCover
    }
  );
};

