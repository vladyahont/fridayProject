import React, {useCallback, useEffect, useState} from 'react'
import {Button, FormControl, FormGroup} from '@material-ui/core'
import {useFormik} from 'formik'
import {NavLink, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {isRegisteredSelector} from '../../../app/selectors'
import {registerTC, setRegisteredAC} from '../auth-reducer'
import {PATH} from '../../../app/Path'
import auth from "../auth.module.css";
import {Grid} from "@mui/material";
import {PasswordField} from "../PasswordField/PasswordField";
import {EmailField} from "../EmailField/EmailField";
import * as Yup from "yup";

type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}


export const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isRegistered = useAppSelector(isRegisteredSelector)

    //const [disabled, setDisabled] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setShowConfirmPassword] = useState(false)

    const handleClickShowPassword = useCallback(() => setShowPassword(show => !show), [])
    const handleClickShowConfirmPassword = useCallback(
        () => setShowConfirmPassword(show => !show),
        []
    )
    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(), [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object<FormikErrorsType>().shape({
            email: Yup.string().required('please enter email').email('invalid email address'),
            password: Yup.string().required('please enter password').min(8).max(16),
            confirmPassword: Yup.string().required('please enter password')
                .oneOf(['password'], 'passwords are not equal'),
        }),
        onSubmit: values => {
            const {email, password} = values
            dispatch(registerTC(email, password))
        },
    })

    useEffect(() => {
        if (isRegistered) {
            navigate(`${PATH.LOGIN}`)
            dispatch(setRegisteredAC(false))
        }
    }, [isRegistered])

    return (
        <Grid container className={auth.container}>
            <FormControl variant="standard" className={auth.formControl}>
                <h1 className={auth.h1}>Sign Up</h1>
                <form onSubmit={formik.handleSubmit}>

                    <FormGroup style={{marginTop: '0'}}>

                        <FormControl margin={'normal'}>
                            <EmailField formik={formik}/>
                        </FormControl>

                        <FormControl margin={'normal'}>
                            <PasswordField showPassword={showPassword}
                                           formik={formik}
                                           fieldType={'password'}
                                           handleClickShowPassword={handleClickShowPassword}
                                           handleMouseDownPassword={handleMouseDownPassword}/>
                        </FormControl>

                        <FormControl margin={'normal'}>
                            <PasswordField showPassword={confirmPassword}
                                           formik={formik}
                                           fieldType={'confirmPassword'}
                                           handleClickShowPassword={handleClickShowConfirmPassword}
                                           handleMouseDownPassword={handleMouseDownPassword}/>
                        </FormControl>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            className={auth.button}
                            color={'primary'}
                        >
                            Sign Up
                        </Button>

                    </FormGroup>

                </form>
                <p className={auth.haveAccText}>Already have an account?</p>
                <NavLink to={`${PATH.LOGIN}`}>
                    <p className={auth.haveAccLink}>Sign In</p>
                </NavLink>
            </FormControl>
        </Grid>
    )
}
