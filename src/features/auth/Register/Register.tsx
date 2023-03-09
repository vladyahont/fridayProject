import React, {useCallback, useState} from 'react'
import {

  Button,
  FormControl,
  FormGroup,

  Input,

  InputLabel,

} from "@material-ui/core";
import {useFormik} from "formik";
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {isLoggedInSelector, isRegisteredSelector} from "../../../app/selectors";
import {registerTC} from "../auth-reducer";


type RegFormikErrorsType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validate = (values: RegFormikErrorsType) => {
  const errors: RegFormikErrorsType = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 or more chars";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords don't equal";
  }
  return errors;
};


function InputWithEyeIcon(props: { showPassword: boolean, handleClickShowPassword: () => void }) {
  return null;
}

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(isRegisteredSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  let [disabled, setDisabled] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      const {email, password} = values;
      dispatch(registerTC(email, password))
    },
  })
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);
  const handleClickShowconfirmPassword = useCallback(() => setShowConfirmPassword((show) => !show), []);

  //если зарегистрировался, переходим на login
  if (isRegistered) {
    return <Navigate to={'/login'}/>
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'}/>
  }


  return (
    <div>
      <FormControl variant="standard">
        <h1> REGISTRATION </h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl margin={"normal"}>
              <InputLabel>Email</InputLabel>
              <Input {...formik.getFieldProps("email")} />
            </FormControl>
            {formik.errors.email && formik.touched.email && (
              <div style={{color: "crimson"}}>{formik.errors.email}</div>
            )}

            <FormControl margin={"normal"}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                endAdornment={
                  <InputWithEyeIcon
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                  />
                }
              />
            </FormControl>
            {formik.errors.password && formik.touched.password && (
              <div style={{color: "crimson"}}>{formik.errors.password}</div>
            )}
            <FormControl margin={"normal"}>
              <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
              <Input
                type={confirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                endAdornment={
                  <InputWithEyeIcon
                    showPassword={confirmPassword}
                    handleClickShowPassword={handleClickShowconfirmPassword}
                  />
                }
              />
            </FormControl>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div style={{color: "crimson"}}>{formik.errors.confirmPassword}</div>
            )}
            <Button style={{marginTop: '10px'}} type={'submit'} variant={'contained'}
                    color={'primary'} disabled={disabled}>Register</Button>
          </FormGroup>
        </form>
        <div>
          <span>Already have an account?</span>
        </div>
        <NavLink to={"/login"}>Sign In</NavLink>
      </FormControl>
    </div>
  )
};


