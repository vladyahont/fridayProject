import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../../app/store";
import {Form, Formik} from "formik";
import {loginTC} from "../auth-reducer";
import {FormGroup} from "@material-ui/core";
import {EmailField} from "../fields/EmailField";
import {PasswordField} from "../fields/PasswordField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../app/Path";
import auth from "../auth.module.css";
import Button from "@mui/material/Button";
import {getValidationSchemaSingIn} from "../validate";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const onClickShow = useCallback(() => setShowPassword(show => !show), [])
  return (
    <Formik
      initialValues={initialValuesSingIn}
      validationSchema={getValidationSchemaSingIn()}
      onSubmit={values => {
        const {email, password, rememberMe} = values
        dispatch(loginTC(email, password, rememberMe))
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup style={{marginTop: '0'}}>
            <EmailField/>
            <PasswordField onClickShow={onClickShow} name="password" isShowed={showPassword}
                           label="Password"/>
            <FormControlLabel name="rememberMe" className={auth.remMe} label={'Remember me'}
                           control={<Checkbox/>}/>
            <NavLink to={`${PATH.RECOVERY}`}>
              <p className={auth.forgotAccText}> Forgot Password?</p>
            </NavLink>
            <Button type={'submit'} variant={'contained'} className={auth.button} color={'primary'}>
              Sign In
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};


const initialValuesSingIn = {
  email: '',
  password: '',
  rememberMe: false,
}

