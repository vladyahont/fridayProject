import React, {useCallback, useEffect, useState} from 'react'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import {NavLink, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {isLoggedInSelector} from "../../../app/selectors";
import {PATH} from "../../../app/Path";
import {loginTC} from "../auth-reducer";
import {FormGroup} from "@material-ui/core";
import * as Yup from 'yup'
import auth from "../auth.module.css";
import {FormikErrorsType} from "../sign-up/SignUp";
import {EmailField} from "../EmailField/EmailField";
import {PasswordField} from "../PasswordField/PasswordField";

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(), [])


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object<FormikErrorsType>().shape({
            email: Yup.string().required('please enter email').email('invalid email address'),
            password: Yup.string().required('please enter password').min(8).max(16),
          }),
    onSubmit: values => {
      const { email, password, rememberMe } = values
      dispatch(loginTC(email, password, rememberMe))
    },
  })

  useEffect(() => { isLoggedIn && navigate(`${PATH.PROFILE}`) }, [isLoggedIn])

  return (
      <Grid container className={auth.container}>
        <FormControl variant="standard" className={auth.formControl}>
          <h1 className={auth.h1}> Sing In </h1>
          <form onSubmit={formik.handleSubmit}>

            <FormGroup style={{marginTop:'0'}}>

              <FormControl margin={'normal'}>
                <EmailField formik={formik}/>
              </FormControl>

              <FormControl margin={'normal'}>
                <PasswordField showPassword={showPassword}
                               formik={formik}
                               fieldType={'password'}
                               handleClickShowPassword={handleClickShowPassword}
                               handleMouseDownPassword={handleMouseDownPassword}/>
              </FormControl>

              <FormControlLabel
                  {...formik.getFieldProps('email')}
                  className={auth.remMe}
                  label={'Remember me'}
                  control={<Checkbox name="rememberMe"/>}
              />
              <a href={`${PATH.RECOVERY}`} className={auth.forgPass}>Forgot Password?</a>
              <Button
                  type={'submit'}
                  variant={'contained'}
                  className={auth.button}
                  color={'primary'}
              >
                Sing In
              </Button>
            </FormGroup>
          </form>
            <p className={auth.haveAccText}>Don't have an account?</p>
          <NavLink to={PATH.REGISTRATION}>
            <p className={auth.haveAccLink}>Sign Up</p>
          </NavLink>
        </FormControl>
      </Grid>
  )
}