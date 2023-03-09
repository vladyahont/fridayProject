import React, {useCallback, useEffect, useState} from 'react'
import {Button, FormControl, FormGroup, Input, InputLabel} from '@material-ui/core'
import {useFormik} from 'formik'
import {NavLink, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {isRegisteredSelector} from '../../../app/selectors'
import {registerTC, setRegisteredAC} from '../auth-reducer'
import {PATH} from '../../../app/Path'
import auth from "../auth.module.css";
import {Grid, IconButton, InputAdornment} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type RegFormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const validate = (values: RegFormikErrorsType) => {
    const errors: RegFormikErrorsType = {}
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

    const [disabled, setDisabled] = useState(false)
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
                    <FormGroup style={{marginTop:'0'}}>
                        <FormControl margin={'normal'}>
                            <InputLabel>Email</InputLabel>
                            <Input {...formik.getFieldProps('email')} className={auth.input}/>
                            {formik.errors.email && formik.touched.email && (
                                <div className={auth.inputError}>{formik.errors.email}</div>
                            )}
                        </FormControl>


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
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.errors.password && formik.touched.password && (
                                <div className={auth.inputError}>{formik.errors.password}</div>
                            )}
                        </FormControl>

                        <FormControl margin={'normal'} >
                            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                            <Input
                                type={confirmPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('confirmPassword')}
                                className={auth.input}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {confirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <div className={auth.inputError}>{formik.errors.confirmPassword}</div>
                            )}
                        </FormControl>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            className={auth.button}
                            style={{textAlign: 'center', color: 'white'}}
                            disabled={disabled}
                            onSubmit={() => {
                                setDisabled(false)
                            }}
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
