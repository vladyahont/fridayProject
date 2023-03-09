import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch} from '../../../app/store'

import auth from '../auth.module.css'

import log from './Login.module.css'

import {isLoggedInSelector} from "../../../app/selectors";
import {PATH} from "../../../app/Path";

  export const Login = () => {
    const isLoggedIn = useSelector(isLoggedInSelector)
    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        rememberMe: false,
      },
      onSubmit: values => {
        console.log(values)
        /*dispatch(setLoginTC(values.email,values.password,values.rememberMe))*/
        /*dispatch(setLoginTC("test123123123@gmail.com","testfsdf12345test",true))*/
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required('Please enter email').email('Invalid email address'),
        password: Yup.string().required('Please enter password'),
      }),
    })

    const handleClickShowPassword = () => setShowPassword(!showPassword)

    if (isLoggedIn) {
      return <Navigate to={PATH.PROFILE} />
    }

    return (
      <Grid container className={auth.container}>
        <h1 className={auth.h1}>Sign in</h1>
        <form onSubmit={formik.handleSubmit} style={{marginTop: '16px'}}>
          <FormControl variant="standard" className={auth.formControl}>
            <TextField
              label="Email"
              name="email"
              variant="standard"
              //value={formik.values.email}  <<< если оставить, то лейбл теряется при потере фокуса и пустом поле
              //sx={}
              //onChange={formik.handleSubmit}
            />
          </FormControl>
          {/*{formik.errors.email && formik.touched.email && (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        )}*/}
          <FormControl variant="standard" className={auth.formControl} margin={'normal'} style={{marginBottom: '0'}}>
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              id="standard-adornment-password"
              className={log.input}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/*{formik.errors.email && formik.touched.email && (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        )}*/}
          <FormControlLabel
            name="rememberMe"
            className={log.remMe}
            label={'Remember me'}
            control={<Checkbox />}
          />
          <a href={`/recovery`} className={log.forgPass}>
            Forgot Password?
          </a>
          <Button type={'submit'} variant={'contained'} className={auth.button}>
            Sign in
          </Button>
        </form>
        <p className={auth.haveAccText}>Don't have an account?</p>
        <NavLink to={`${PATH.REGISTRATION}`}>
          <p className={auth.haveAccLink}>Sign Up</p>
        </NavLink>
      </Grid>
    )
  }