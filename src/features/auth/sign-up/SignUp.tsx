import React from 'react'

import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'

import VisibilityOff from '@mui/icons-material/VisibilityOff'

import auth from '../auth.module.css'

import s from './signUp.module.css'

import { NavLink } from 'react-router-dom'

export const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Grid container spacing={2} className={auth.container}>
      <form className={auth.form}>
        <FormControl className={auth.formControl} variant="standard">
          <FormGroup className={auth.formGroup}>
            <h1 className={auth.h1}>Sign Up</h1>
            <TextField label="Email" variant="standard" className={auth.input} />
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              className={auth.input}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
            <Input
              id="standard-adornment-password"
              className={auth.input}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button variant="contained" className={auth.button}>
              Sign Up
            </Button>
          </FormGroup>
        </FormControl>
      </form>
      <p className={auth.haveAccText}>Already have an account?</p>
      <NavLink to={`/fridayProject/login`}>
        <p className={auth.haveAccLink}>Sign In</p>
      </NavLink>
    </Grid>
  )
}
