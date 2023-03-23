import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from "../../../app/Path";
import s from "../header/header.module.css"
import {AppBar} from "@mui/material";

export const DevFooter = () => {

    const devFooterStyle = {
        minHeight: '60px',
        fontWeight: '600',
        textDecoration: 'none',
    }

    return (
        <AppBar position="static" color="transparent" style={{justifyContent: 'space-between'}}>
            <div className={s.navBlock} style={devFooterStyle}>
                <NavLink to={PATH.PROFILE} className={({isActive}) => (isActive ? s.active : " ")}> Profile</NavLink>
                <NavLink to={PATH.REGISTRATION}
                         className={({isActive}) => (isActive ? s.active : " ")}>Registration</NavLink>
                <NavLink to={PATH.LOGIN} className={({isActive}) => (isActive ? s.active : " ")}>Login</NavLink>
                <NavLink to={PATH["400"]} className={({isActive}) => (isActive ? s.active : " ")}>ErrorPage</NavLink>
                <NavLink to={PATH.RECOVERY}
                         className={({isActive}) => (isActive ? s.active : " ")}>PasswordRecovery</NavLink>
                <NavLink to={PATH.NEWPASSWORD}
                         className={({isActive}) => (isActive ? s.active : " ")}>NewPasswordPage</NavLink>
                <NavLink to={PATH.PACKS}
                         className={({isActive}) => (isActive ? s.active : " ")}>PacksPage</NavLink>
            </div>
        </AppBar>
    )
}
