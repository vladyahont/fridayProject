import React from "react";
import { useField} from "formik";
import {Input, InputLabel} from "@material-ui/core";
import auth from "../auth.module.css";


export const EmailField: React.FC = () => {
  const [field, meta] = useField("email");
  return (
    <>
      <InputLabel>Email</InputLabel>
      <Input className={auth.input} {...field}/>
      {meta.touched && meta.error ? (
        <div className="">{meta.error}</div>
      ) : null}
    </>
  );
};