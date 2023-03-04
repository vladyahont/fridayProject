import React from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import s from './Login.module.css'

export const Login = () => {
  //const formik =
  //login1 branch
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form className={s.body}>
          <FormControl>
            <FormGroup>
              <h2>Sign in</h2>
              <TextField label="Email" margin="normal" />
              <TextField type="password" label="Password" margin="normal" />
              <FormControlLabel label={'Remember me'} control={<Checkbox />} />
              <a href={`/recovery`}>Forgot Password?</a>
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Sign in
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
