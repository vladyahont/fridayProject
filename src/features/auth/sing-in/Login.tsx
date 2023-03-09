import React from 'react'
import { Input, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import log from './Login.module.css'
import {isLoggedInSelector, isRegisteredSelector} from "../../../app/selectors";
import {PATH} from "../../../app/Path";
import {setLoginTC} from "../auth-reducer";
import {FormGroup} from "@material-ui/core";

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

type LogFormikErrorsType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const validate = (values: LogFormikErrorsType) => {
  const errors: LogFormikErrorsType = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 or more chars'
  }
  return errors
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
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
      <div>
        <FormControl variant="standard">
          <h1> Sing In </h1>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl margin={'normal'}>
                <InputLabel>Email</InputLabel>
                <Input {...formik.getFieldProps('email')} />
              </FormControl>
              {formik.errors.email && formik.touched.email && (
                  <div style={{ color: 'crimson' }}>{formik.errors.email}</div>
              )}

              <FormControl margin={'normal'}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    {...formik.getFieldProps('password')}
                    // endAdornment={
                    //   // <InputWithEyeIcon
                    //   //     showPassword={showPassword}
                    //   //     handleClickShowPassword={handleClickShowPassword}
                    //   // />
                    // }
                />
              </FormControl>
              {formik.errors.password && formik.touched.password && (
                  <div style={{ color: 'crimson' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                  className={log.remMe}
                  label={'Remember me'}
                  control={<Checkbox name="rememberMe"/>}
              />
              <Button
                  style={{ marginTop: '10px' }}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
              >
                Sing In
              </Button>
            </FormGroup>
          </form>
          <div>
            <span>Already have an account?</span>
          </div>
          <NavLink to={'/login'}>Sign Up</NavLink>
        </FormControl>
      </div>
  )
}