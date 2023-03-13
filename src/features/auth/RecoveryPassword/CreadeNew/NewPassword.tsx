import React from 'react';
import {useAppDispatch} from "../../../../app/store";

import {NavLink, useParams} from "react-router-dom";
import {FormikErrors, FormikTouched, useField, useFormik} from "formik";
import {setNewPasswordTC} from "../../auth-reducer";
import {PATH} from "../../../../app/Path";

export const NewPassword = () => {
   const dispatch = useAppDispatch()
   const params = useParams<"token">();

   let resetPasswordToken = ""

   if(params.token) {
     resetPasswordToken  = params.token
   }

   const formik = useFormik(
     {
       initialValues: {
         password: '',
       },
       onSubmit: values => {
         const {password} = values
         console.log(resetPasswordToken)
         dispatch(setNewPasswordTC(password,resetPasswordToken))
       },
     }
   )

   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="password">New pass</label>
       <input
         id="password"
         type="password"
         {...formik.getFieldProps("password")}
       />
       <button type="submit">Submit</button>
       <NavLink to={PATH.LOGIN}>nnb</NavLink>

     </form>
   );
 };

