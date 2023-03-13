import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {NavLink, useNavigate} from "react-router-dom";
import {isRegisteredSelector} from "../../../app/selectors";
import React, {useCallback, useEffect, useState} from "react";
import {PATH} from "../../../app/Path";
import {registerTC, setRegisteredAC} from "../auth-reducer";
import auth from "../auth.module.css";
import {Form, Formik} from "formik";
import {Button} from "@material-ui/core";
import {PasswordField} from "../Fields/PasswordField";
import {EmailField} from "../Fields/EmailField";

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}


const validationSchema = Yup.object<FormikErrorsType>().shape({
  email: Yup.string().required('please enter email').email('invalid email address'),
  password: Yup.string().required('please enter password').min(8).max(16),
  confirmPassword: Yup.string().required('please enter password')
    .oneOf(['password'], 'passwords are not equal'),
})
const initialValues = {
  email: '',
  password: '',
  confirmPassword: ''
}
export const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isRegistered = useAppSelector(isRegisteredSelector)

  useEffect(() => {
    if (isRegistered) {
      navigate(`${PATH.LOGIN}`)
      dispatch(setRegisteredAC(false))
    }
  }, [isRegistered])

  return (
    <>
      <div>
        <h2>Signup</h2>
        <SignUpForm/>
      </div>
      );
      <p className={auth.haveAccText}>Already have an account?</p>
      <NavLink to={`${PATH.LOGIN}`}>
        <p className={auth.haveAccLink}>Sign In</p>
      </NavLink>
    </>
  )
}


const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const onClickShow = useCallback(() => setShowPassword(show => !show), [])
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        const {email, password} = values
        dispatch(registerTC(email, password))
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <EmailField/>
          <PasswordField onClickShow={onClickShow} name="password" isShowed={showPassword}
                           label="Password"/>
          <PasswordField onClickShow={onClickShow} name="confirmPassword"
                           isShowed={showPassword} label="Confirm Password"/>
          <Button type={'submit'} variant={'contained'} className={auth.button} color={'primary'}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};


