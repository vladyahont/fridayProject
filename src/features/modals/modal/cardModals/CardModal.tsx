import React from 'react';
import {BasicModal} from "../BasicModal";
import {useModals} from "../../useModals";
import {CardModalForm} from "./CardModalForm";

type CardModalProps = {
  title: string
  open: boolean,
  onSubmit: (data: any) => void,
}
export const CardModal = ({title, open, onSubmit}: CardModalProps) => {
  const {closeModal,modalData:{question,answer}} = useModals()
  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >
      <CardModalForm onSubmit={onSubmit} closeModal={closeModal} answer={answer} question={question}/>
    </BasicModal>
  )
};
