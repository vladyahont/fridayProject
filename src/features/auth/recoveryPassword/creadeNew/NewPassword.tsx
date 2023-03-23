import React, {FC} from 'react';
import auth from "../../auth.module.css";
import {Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {NewPasswordForm} from "./NewPasswordForm";
export const NewPassword:FC = () => {
  return (
    <Grid container className={auth.container}>
      <FormControl variant="standard" className={auth.formControl}>
        <h1 className={auth.h1}>Create new password</h1>
        <NewPasswordForm/>
      </FormControl>
    </Grid>
  );
};
