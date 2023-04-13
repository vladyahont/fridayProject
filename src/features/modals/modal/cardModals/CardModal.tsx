import React from 'react';
import {BasicModal} from "../BasicModal";
import {useModals} from "../../useModals";
import {CardModalForm} from "./CardModalForm";
import noCover from "./../../../../assest/imgs/noCover.png"

type CardModalProps = {
  title: string
  open: boolean,
  onSubmit: (data: any) => void,
}
export const CardModal = ({title, open, onSubmit}: CardModalProps) => {
  const {
    closeModal,
    setQuestionImg,
    setAnswerImg,
    modalData: {
      question,
      answer,
      answerImg,
      questionImg
    }
  } = useModals()
  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >
      <CardModalForm onSubmit={onSubmit} closeModal={closeModal}
                     answer={answer} question={question}
                     answerImg={answerImg || noCover}
                     questionImg={questionImg || noCover}
                     setQuestionImg = {setQuestionImg}
                     setAnswerImg = {setAnswerImg}/>
    </BasicModal>
  )
};
