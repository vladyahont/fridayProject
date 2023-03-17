import React, {FC, useCallback, useState} from "react";
import {useAppDispatch} from "../../../../app/store";
import {Form, Formik} from "formik";
import {registerTC} from "../../auth-reducer";
import {EmailField} from "../../Fields/EmailField";
import {PasswordField} from "../../Fields/PasswordField";
import {Button, FormGroup} from "@material-ui/core";
import auth from "../../auth.module.css";
import * as Yup from "yup";

export const SignUpForm: FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const onClickShow = useCallback(() => setShowPassword(show => !show), [])

  return (
    <Formik
      initialValues={initialValuesSingUp}
      validationSchema={validationSchemaSingUp}
      onSubmit={values => {
        const {email, password} = values
        dispatch(registerTC(email, password))
      }}
    >
      {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup style={{marginTop:'0'}}>
              <EmailField/>
              <PasswordField onClickShow={onClickShow} name="password" isShowed={showPassword}
                             label="Password"/>
              <PasswordField onClickShow={onClickShow} name="confirmPassword"
                             isShowed={showPassword} label="Confirm Password"/>
              <Button type={'submit'} variant={'contained'} className={auth.button} color={'primary'}>
                Sign Up
              </Button>
              </FormGroup>
            </Form>
      )}
    </Formik>
  );
};

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

const validationSchemaSingUp = Yup.object<FormikErrorsType>().shape({
  email: Yup.string().required('please enter email').email('invalid email address'),
  password: Yup.string().required('please enter password').min(8).max(16),
  confirmPassword: Yup.string().required('please enter password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

const initialValuesSingUp = {
  email: '',
  password: '',
  confirmPassword: ''
}
