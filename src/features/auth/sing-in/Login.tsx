import React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { AppStateType } from '../../../app/store'

import log from './Login.module.css'

export const Login = () => {
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  if (isLoggedIn) {
    return <Navigate to={'/fridayProject/profile'} />
  }

  return (
    <Grid container className={log.container}>
      <h1 className={log.h1}>Sign in</h1>
      <FormControl variant="standard" className={log.formControl}>
        <TextField label="Email" variant="standard" />
      </FormControl>
      <FormControl variant="standard" className={log.formControl}>
        <InputLabel>Password</InputLabel>
        <Input
          id="standard-adornment-password"
          className={log.input}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControlLabel className={log.remMe} label={'Remember me'} control={<Checkbox />} />
      <a href={`/recovery`} className={log.forgPass}>
        Forgot Password?
      </a>
      <Button type={'submit'} variant={'contained'} className={log.button}>
        Sign in
      </Button>
      <p className={log.haveAccText}>Already have an account?</p>
      <NavLink to={`/fridayProject/registration`}>
        <p className={log.haveAccLink}>Sign Up</p>
      </NavLink>
    </Grid>
  )
}
