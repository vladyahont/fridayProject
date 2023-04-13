import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {fileConverter} from "../../../../utils/add-img-utils";
import {TypeSelector, VariantType} from "../../../components/typeSelector/TypeSelector";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import {ImgBox} from "../../../components/imgBox/ImgBox";

type CardModalFormPropsType = {
  onSubmit: (data: any) => void,
  closeModal: () => void,
  question?: string,
  answer?: string,
  answerImg: string,
  questionImg: string,
  setAnswerImg: (image: string) => void
  setQuestionImg: (image: string) => void
}
export const CardModalForm = ({
                                onSubmit,
                                closeModal,
                                question, answer,
                                answerImg, questionImg,
                                setQuestionImg,setAnswerImg
                              }: CardModalFormPropsType) => {
  const [type, setType] = useState<VariantType>("text")

  const isText = type === 'text'

  const validationValue = Yup.string()
    .min(2, 'Too Short!')
    .max(120, 'Too Long!')
    .required('Required')

  const formik = useFormik({
    initialValues: {
      question: question || "",
      answer: answer || "",
    },
    enableReinitialize: true,
    validationSchema: isText && Yup.object().shape({
      question: validationValue,
      answer: validationValue,
    }),
    onSubmit: values => {
      onSubmit(values)
      closeModal()
    },
  });

  const onChangeAnswerImg = (e: ChangeEvent<HTMLInputElement>) => {
    fileConverter(e.target.files, (file64: string) => {
       setAnswerImg(file64)
    })
  };

  const onChangeQuestionImg = (e: ChangeEvent<HTMLInputElement>) => {
    fileConverter(e.target.files, (file64: string) => {
       setQuestionImg(file64)
    })
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <TypeSelector type={type} setType={setType}/>
      {isText && <div>
          <TextField
              fullWidth id="question" name="question" label="Question"
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean(formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
          />
          <TextField
              fullWidth id="answer" name="answer" label="Answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
          />
      </div>}
      {isText ||
          <>
              <Box>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/png, image/jpeg" type="file" onChange={onChangeQuestionImg}/>
                      <PhotoCamera/>
                  </IconButton>
                  <ImgBox defaultImg={answerImg}/>
              </Box>
              <Box>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/png, image/jpeg" type="file" onChange={onChangeAnswerImg}/>
                      <PhotoCamera/>
                  </IconButton>
                  <ImgBox defaultImg={questionImg}/>
              </Box>
          </>
      }
      <Button type={"submit"}>Ok</Button>
      <Button onClick={closeModal}>Cancel</Button>
    </form>
  );
};
