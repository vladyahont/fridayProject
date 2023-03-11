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

type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}

export const validate = (values: FormikErrorsType) => {
    const errors: FormikErrorsType = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Should be 8 or more chars'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords are not equal"
    }
    return errors
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
            confirmPassword: '',
            rememberMe: false
        },
        validate,
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
