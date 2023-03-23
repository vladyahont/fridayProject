import React, {FC, useCallback, useState} from 'react';
import {useAppDispatch} from "../../../../app/store";

import {useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import {setNewPasswordTC} from "../../auth-reducer";
import {getValidationSchemaPassword} from "../../validate";
import {Button, FormGroup} from "@material-ui/core";
import {PasswordField} from "../../fields/PasswordField";
import auth from "../../auth.module.css";

export const NewPasswordForm: FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams<"token">();
  let resetPasswordToken = ""

  if (params.token) {
    resetPasswordToken = params.token
  }

  const [showPassword, setShowPassword] = useState(false)
  const onClickShow = useCallback(() => setShowPassword(show => !show), [])

  return <Formik
    initialValues={{
      password: '',
    }}
    validationSchema={getValidationSchemaPassword()}
    onSubmit={values => {
      const {password} = values
      console.log(resetPasswordToken)
      dispatch(setNewPasswordTC(password, resetPasswordToken))
    }}
  >
    {(formik) => (
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup style={{marginTop: '0'}}>
          <PasswordField onClickShow={onClickShow} name="password" isShowed={showPassword}
                         label="Password"/>
          <p className={auth.manualText}>Enter your email address and we will send you further instructions </p>
          <Button type={'submit'} variant={'contained'} className={auth.button} color={'primary'}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    )}
  </Formik>
}
