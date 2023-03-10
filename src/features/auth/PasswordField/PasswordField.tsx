import {Input, InputLabel} from "@material-ui/core";
import auth from "../auth.module.css";
import {IconButton, InputAdornment} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React from "react";
import {useFormik} from "formik";

type PasswordFieldType = {
    showPassword: boolean,
    formik: ReturnType<typeof useFormik<any>>,
    fieldType: string,
    handleClickShowPassword: () => void
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const PasswordField: React.FC<PasswordFieldType> = ({
                                                            showPassword,
                                                            handleMouseDownPassword,
                                                            handleClickShowPassword,
                                                            formik,
                                                            fieldType,
                                                        }) => {

    return (
        <>
            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps(fieldType)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {fieldType == 'confirmPassword'
                ? formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <div className={auth.inputError}>{`${formik.errors.confirmPassword}`}</div>)
                : formik.errors.password && formik.touched.password && (
                <div className={auth.inputError}>{`${formik.errors.password}`}</div>)
            }

        </>
    )
}