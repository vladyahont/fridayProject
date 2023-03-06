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

import { NavLink } from 'react-router-dom'

export const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Grid container className={auth.container}>
      <h1 className={auth.h1}>Sign Up</h1>
      <FormControl variant="standard" className={auth.formControl}>
        <TextField label="Email" variant="standard" />
      </FormControl>
      <FormControl variant="standard" className={auth.formControl}>
        <InputLabel>Password</InputLabel>
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
      </FormControl>
      <FormControl variant="standard" className={auth.formControl}>
        <InputLabel className={auth.r}>Password</InputLabel>
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
      </FormControl>
      <Button variant="contained" className={auth.button}>
        Sign Up
      </Button>
      <p className={auth.haveAccText}>Already have an account?</p>
      <NavLink to={`/fridayProject/login`}>
        <p className={auth.haveAccLink}>Sign In</p>
      </NavLink>
    </Grid>
  )
}
