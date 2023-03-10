import {Input, InputLabel} from "@material-ui/core";
import auth from "../auth.module.css";
import React from "react";
import {useFormik} from "formik";

type EmailFieldType = {
    formik: ReturnType<typeof useFormik<any>>,
}

export const EmailField: React.FC<EmailFieldType> = ({ formik }) => {
    return (
        <>
            <InputLabel>Email</InputLabel>
            <Input {...formik.getFieldProps('email')} className={auth.input}/>
            {formik.errors.email && formik.touched.email && (
                <div className={auth.inputError}>{`${formik.errors.email}`}</div>
            )}
        </>
    )
}