import React from 'react';
import {BasicModal} from "../BasicModal";
import Button from "@mui/material/Button";


type PackModalProps = {
  title: string
  open: boolean,
  closeModal: () => void,
  onSubmit: (data: any) => void,
}
export const PackModal = ({
                            open,
                            closeModal,
                            onSubmit,
                            title,
                          }: PackModalProps) => {
  const handleSubmit = (e:any) =>{
    e.preventDefault()
    onSubmit("form_value")
  }
  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >
      <form onSubmit={handleSubmit}>
        <Button type={"submit"} onClick={onSubmit} >Ok</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </form>
    </BasicModal>
  );
};
