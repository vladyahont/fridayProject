import React from 'react';
import Button from "@mui/material/Button/Button";
import {BasicModal} from "./BasicModal";
import {useModals} from "../useModals";


type DeleteModalPropsType = {
  title: string,
  open: boolean,
  onDelete: () => void,
}
export const DeleteModal = ({
                       open,
                       title,
                       onDelete
                     }: DeleteModalPropsType) => {

  const {modalData: {name}, closeModal} = useModals()
  const deletePackHandler = () => {
    onDelete()
    closeModal()
  }
  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >
      <div>Do you really want ro remove <span style={{fontWeight: '600'}}>{name}</span>?
        All cards will be deleted
      </div>
      <Button variant={'contained'} color={'error'}
              onClick={deletePackHandler}>Delete</Button>
    </BasicModal>
  );
};
