import React, {useCallback, useState} from 'react'
import {Grid, IconButton, Input, InputAdornment, InputLabel} from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {isLoggedInSelector} from "../../../app/selectors";
import {PATH} from "../../../app/Path";
import {setLoginTC} from "../auth-reducer";
import {FormGroup} from "@material-ui/core";
import * as Yup from 'yup'
import log from "./Login.module.css";
import auth from "../auth.module.css";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type LogFormikErrorsType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object<LogFormikErrorsType>().shape({
            email: Yup.string().required('please enter email').email('invalid email address'),
            password: Yup.string().required('please enter password').min(5).max(16),
          }),
    onSubmit: values => {
      const { email, password, rememberMe } = values

      dispatch(setLoginTC(email, password, rememberMe))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }
  console.log(formik.values)

  return (
      <Grid container className={log.container}>
        <FormControl variant="standard" className={log.formControl}>
          <h1 className={log.h1}> Sing In </h1>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup style={{marginTop:'0'}}>
              <FormControl margin={'normal'}>
                <InputLabel>Email</InputLabel>
                <Input {...formik.getFieldProps('email')} className={log.input}/>
              </FormControl>
              {formik.errors.email && formik.touched.email && (
                  <div style={{ color: 'crimson' }}>{formik.errors.email}</div>
              )}
              <FormControl margin={'normal'}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                    className={auth.input}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    }
                />
              </FormControl>
              {formik.errors.password && formik.touched.password && (
                  <div style={{ color: 'crimson' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                  {...formik.getFieldProps('email')}
                  className={log.remMe}
                  label={'Remember me'}
                  control={<Checkbox name="rememberMe"/>}
              />
              <Button
                  className={log.button}
                  style={{ marginTop: '10px' }}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
              >
                Sing In
              </Button>
            </FormGroup>
          </form>
            <p className={log.haveAccText}>Already have an account?</p>
          <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
        </FormControl>
      </Grid>
  )
}




// export const Login = () => {
//   const isLoggedIn = useSelector(isLoggedInSelector)
//   const dispatch = useAppDispatch()
//
//   const [showPassword, setShowPassword] = useState(false)
//
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       rememberMe: false,
//     },
//     onSubmit: values => {
//       console.log(values)
//       /*dispatch(setLoginTC(values.email,values.password,values.rememberMe))*/
//       /*dispatch(setLoginTC("test123123123@gmail.com","testfsdf12345test",true))*/
//     },
//     validationSchema: Yup.object().shape({
//       email: Yup.string().required('Please enter email').email('Invalid email address'),
//       password: Yup.string().required('Please enter password'),
//     }),
//   })
//
//   const handleClickShowPassword = () => setShowPassword(!showPassword)
//
//   if (isLoggedIn) {
//     return <Navigate to={PATH.PROFILE} />
//   }
//
//   return (
//     <Grid container className={auth.container}>
//       <h1 className={auth.h1}>Sign in</h1>
//       <form onSubmit={formik.handleSubmit}>
//         <FormControl variant="standard" className={auth.formControl}>
//           <TextField
//             label="Email"
//             name="email"
//             variant="standard"
//             //value={formik.values.email}  <<< если оставить, то лейбл теряется при потере фокуса и пустом поле
//             //sx={}
//             //onChange={formik.handleSubmit}
//           />
//         </FormControl>
//         {/*{formik.errors.email && formik.touched.email && (
//         <div style={{ color: 'red' }}>{formik.errors.email}</div>
//       )}*/}
//         <FormControl variant="standard" className={auth.formControl}>
//           <InputLabel>Password</InputLabel>
//           <Input
//             name="password"
//             id="standard-adornment-password"
//             className={log.input}
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>
//         {/*{formik.errors.email && formik.touched.email && (
//         <div style={{ color: 'red' }}>{formik.errors.email}</div>
//       )}*/}
//         <FormControlLabel
//           name="rememberMe"
//           className={log.remMe}
//           label={'Remember me'}
//           control={<Checkbox />}
//         />
//         <a href={`/recovery`} className={log.forgPass}>
//           Forgot Password?
//         </a>
//         <Button type={'submit'} variant={'contained'} className={auth.button}>
//           Sign in
//         </Button>
//       </form>
//       <p className={auth.haveAccText}>Already have an account?</p>
//       <NavLink to={`/fridayProject/registration`}>
//         <p className={auth.haveAccLink}>Sign Up</p>
//       </NavLink>
//     </Grid>
//   )
// }

// const validate = (values: LogFormikErrorsType) => {
//   const errors: LogFormikErrorsType = {}
//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//   if (!values.password) {
//     errors.password = 'Required'
//   } else if (values.password.length < 8) {
//     errors.password = 'Must be 8 or more chars'
//   }
//   return errors
// }