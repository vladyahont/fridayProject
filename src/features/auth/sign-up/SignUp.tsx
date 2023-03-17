import {useAppDispatch, useAppSelector} from "../../../app/store";
import {NavLink, useNavigate} from "react-router-dom";
import {isRegisteredSelector} from "../../../app/selectors";
import React, {useEffect} from "react";
import {PATH} from "../../../app/Path";
import {setRegisteredAC} from "../auth-reducer";
import auth from "../auth.module.css";
import {SignUpForm} from "./SingUpForm";
import {Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isRegistered = useAppSelector(isRegisteredSelector)

  useEffect(() => {
    if (isRegistered) {
      navigate(`${PATH.LOGIN}`)
      dispatch(setRegisteredAC(false))
    }
  }, [isRegistered])

  return (
    <Grid container className={auth.container}>
      <FormControl variant="standard" className={auth.formControl}>
        <h1 className={auth.h1}>Signup</h1>
        <SignUpForm/>
        <p className={auth.haveAccText}>Already have an account?</p>
        <NavLink to={`${PATH.LOGIN}`}>
          <p className={auth.haveAccLink}>Sign In</p>
        </NavLink>
      </FormControl>
    </Grid>
  )
}





