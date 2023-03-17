import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {isSentInstructionSelector, userEmailSelector} from "../../../app/selectors";
import {useFormik} from "formik";
import * as Yup from "yup";
import {forgotTC} from "../auth-reducer";
import auth from "../auth.module.css";
import {PATH} from "../../../app/Path";
import {useNavigate} from "react-router-dom";


export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(userEmailSelector)
  const isSentInstruction = useAppSelector(isSentInstructionSelector)
  const navigate = useNavigate()

  const formik = useFormik(
    {
      initialValues: {
        email: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required('please enter email').email('invalid email address'),
      }),
      onSubmit: values => {
        const {email} = values
        dispatch(forgotTC(email))
      },
    }
  )

  useEffect(() => { isSentInstruction && navigate(`${PATH.CHECK_EMAIL}`) }, [isSentInstruction])

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps("email")}
      />
      {formik.errors.email && formik.touched.email && (
        <div className={auth.inputError}>{formik.errors.email}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
