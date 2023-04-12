import React from 'react';
import {BasicModal} from "../BasicModal";
type PackModalProps = {
  title:string
  open:boolean,
  closeModal: () => void
}
export const PackModal = ({
                            open,
                            closeModal,
    title,
}:PackModalProps) => {


  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >

    </BasicModal>
  );
};
