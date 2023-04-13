import React, {ChangeEvent} from 'react';
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {fileConverter} from "../../../../utils/add-img-utils";

type CardModalFormPropsType = {
  onSubmit: (data: any) => void,
  closeModal: () => void,
}
export const CardModalForm = ({
                                onSubmit,
                                closeModal
                              }: CardModalFormPropsType) => {
  const formik = useFormik({
    initialValues: {},
    //https://stackoverflow.com/questions/71497962/initial-values-in-formik-arent-showing
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
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
      <Button type={"submit"}>Ok</Button>
      <Button onClick={closeModal}>Cancel</Button>
    </form>
  );
};
