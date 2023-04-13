import React, {ChangeEvent} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {fileConverter} from "../../../../utils/add-img-utils";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import {ImgBox} from "../../../components/imgBox/ImgBox";
import {TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";


type ModalFormProps = {
  name: string,
  onSubmit: (data: any) => void,
  deckCover: string,
  setDeckCover: (image: string) => void
  closeModal: () => void,
}
export const PackModalForm = ({
                            name,
                            onSubmit,
                            deckCover,
                            setDeckCover,
                            closeModal
                          }: ModalFormProps) => {
  const formik = useFormik({
    initialValues: {
      name,
      private: false,
    },
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
      setDeckCover(file64)
    })
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/png, image/jpeg" type="file" onChange={onChangeCover}/>
          <PhotoCamera/>
        </IconButton>
        <ImgBox defaultImg={deckCover}/>
      </Box>
      <TextField
        fullWidth id="name" name="name" label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <FormControlLabel
        name={"private"}
        sx={{marginBottom: '30px'}}
        control={<Checkbox/>}
        label="Private pack"
      />
      <Button type={"submit"}>Ok</Button>
      <Button onClick={closeModal}>Cancel</Button>
    </form>
  );
};
