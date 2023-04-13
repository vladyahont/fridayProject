import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {fileConverter} from "../../../../utils/add-img-utils";
import {TypeSelector, VariantType} from "../../../components/typeSelector/TypeSelector";

type CardModalFormPropsType = {
  onSubmit: (data: any) => void,
  closeModal: () => void,
  question?:string,
  answer?:string,
}
export const CardModalForm = ({
                                onSubmit,
                                closeModal,question,answer,
                              }: CardModalFormPropsType) => {
  const [type,setType] = useState<VariantType>("text")
  const isText = type === 'text'


  const validationValue =Yup.string()
      .min(2, 'Too Short!')
      .max(120, 'Too Long!')
      .required('Required')

  const formik = useFormik({
    initialValues: {
      question: question || "",
      answer:answer || "",
    },
    enableReinitialize: true,
    validationSchema: isText && Yup.object().shape({
      question: validationValue,
      answer:validationValue,
    }),
    onSubmit: values => {
      onSubmit(values)
      closeModal()
    },
  });



  const onChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    fileConverter(e.target.files, (file64: string) => {
     /* setDeckCover(file64)*/
    })
  };
  return (
    <form onSubmit={formik.handleSubmit}>

      <TypeSelector type = {type} setType={setType}/>
      {isText && <div>
          text
      </div>}
      {isText ||
          <div>
              img
          </div>
      }
      <Button type={"submit"}>Ok</Button>
      <Button onClick={closeModal}>Cancel</Button>
    </form>
  );
};
