import React, {useEffect} from 'react';
import {useAppSelector} from "../../../app/store";
import {isSentInstructionSelector} from "../../../app/selectors";
import auth from "../auth.module.css";
import {PATH} from "../../../app/Path";
import {NavLink, useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {PasswordRecoveryForm} from "./PasswordRecoveryForm";


export const PasswordRecovery = () => {
  const isSentInstruction = useAppSelector(isSentInstructionSelector)
  const navigate = useNavigate()

  useEffect(() => { isSentInstruction && navigate(`${PATH.CHECK_EMAIL}`) }, [isSentInstruction])

  return  <Grid container className={auth.container}>
    <FormControl variant="standard" className={auth.formControl}>
      <h1 className={auth.h1}>Forgot your password?</h1>
      <PasswordRecoveryForm/>
      <p className={auth.haveAccText}>Did you remember your password??</p>
      <NavLink to={`${PATH.LOGIN}`}>
        <p className={auth.haveAccLink}>Try logging in</p>
      </NavLink>
    </FormControl>
  </Grid>
};
