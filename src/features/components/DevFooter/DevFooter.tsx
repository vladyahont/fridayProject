import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from "../../../app/Path";
import s from "../Header/header.module.css"
import {AppBar} from "@mui/material";

export const DevFooter = () => {
    return (
        <AppBar position="static" color="transparent" style={{justifyContent: 'space-between'}}>
            <div className={s.navBlock}
                 style={{minHeight: '60px', alignItems: 'center', fontWeight: '600', textDecoration: 'none'}}>
                <NavLink to={PATH.PROFILE} className={({isActive}) => (isActive ? s.active : " ")}> Profile</NavLink>
                <NavLink to={PATH.REGISTRATION}
                         className={({isActive}) => (isActive ? s.active : " ")}>Registration</NavLink>
                <NavLink to={PATH.LOGIN} className={({isActive}) => (isActive ? s.active : " ")}>Login</NavLink>
                <NavLink to={PATH["404"]} className={({isActive}) => (isActive ? s.active : " ")}>ErrorPage</NavLink>
                <NavLink to={PATH.RECOVERY}
                         className={({isActive}) => (isActive ? s.active : " ")}>PasswordRecovery</NavLink>
                <NavLink to={PATH.NEWPASSWORD}
                         className={({isActive}) => (isActive ? s.active : " ")}>NewPasswordPage</NavLink>
            </div>
        </AppBar>
    )
}
