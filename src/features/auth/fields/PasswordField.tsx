
import { useField} from "formik";
import React from "react";
import {Input, InputLabel} from "@material-ui/core";
import {IconButton, InputAdornment} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {FieldInputProps} from "features/auth/fields/type";

type MyPasswordInputType =
  { name: string, label: string, onClickShow: () => void, isShowed: boolean }
  & FieldInputProps

export const PasswordField: React.FC<MyPasswordInputType> = ({
                                                          label,
                                                          name,
                                                          isShowed,
                                                          onClickShow,
                                                          ...props
                                                        }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        {...field} {...props}
        type={isShowed ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickShow}
            >
              {isShowed ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.touched && meta.error ? (
        <div className="">{meta.error}</div>
      ) : null}
    </>
  )
}