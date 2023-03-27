import React, {FC, useCallback, useState} from "react";
import {useAppDispatch} from "../../../app/store";
import {Form, Formik} from "formik";
import {registerTC} from "../auth-reducer";
import {EmailField} from "../fields/EmailField";
import {PasswordField} from "../fields/PasswordField";
import {Button, FormGroup} from "@material-ui/core";
import auth from "../auth.module.css";
import {getValidationSchemaSingUp} from "../validate";

export const SignUpForm: FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const onClickShow = useCallback(() => setShowPassword(show => !show), [])

  return (
    <Formik
      initialValues={initialValuesSingUp}
      validationSchema={getValidationSchemaSingUp()}
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



const initialValuesSingUp = {
  email: '',
  password: '',
  confirmPassword: ''
}
