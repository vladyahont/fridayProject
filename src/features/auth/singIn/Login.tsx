import React, {FC, useEffect} from 'react'
import {Grid} from '@mui/material'
import {NavLink, useNavigate} from 'react-router-dom'
import {useAppSelector} from 'app/store'
import {isLoggedInSelector} from "app/selectors";
import {PATH} from "app/Path";
import auth from "../auth.module.css";
import FormControl from "@mui/material/FormControl";
import {LoginForm} from "./LoginForm";


export const Login: FC  = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const navigate = useNavigate()

  useEffect(() => {
    isLoggedIn && navigate(`${PATH.PROFILE}`)
  }, [isLoggedIn])

  return (
    <Grid container className={auth.container}>
      <FormControl variant="standard" className={auth.formControl}>
        <h1 className={auth.h1}>Sign in</h1>
        <LoginForm/>
        <p className={auth.haveAccText}>Already have an account?</p>
        <NavLink to={`${PATH.REGISTRATION}`}>
          <p className={auth.haveAccLink}>Sign Up</p>
        </NavLink>
      </FormControl>
    </Grid>
  )
}



