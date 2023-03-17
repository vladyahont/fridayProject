import {getValidationSchemaEmail} from "../validate";
import {forgotTC} from "../auth-reducer";
import {useAppDispatch} from "../../../app/store";
import React from "react";
import {Form, Formik} from "formik";
import {FormGroup} from "@material-ui/core";
import {EmailField} from "../Fields/EmailField";
import {Button} from "@mui/material";
import auth from "../auth.module.css";

export const PasswordRecoveryForm = () =>{
  const dispatch = useAppDispatch()

  return(<Formik
      initialValues={ {
        email: '',
      }}
      validationSchema={getValidationSchemaEmail()}
      onSubmit={values => {
        const {email} = values
        dispatch(forgotTC(email))
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup style={{marginTop: '0'}}>
            <EmailField/>
            <p className={auth.manualText}>Enter your email address and we will send you further instructions </p>
            <Button type={'submit'} variant={'contained'} className={auth.button} color={'primary'}>
              Send Instructions
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  )
}