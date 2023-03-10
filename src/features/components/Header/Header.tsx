import React from 'react'
import Box from "@mui/material/Box";
import {NavLink} from 'react-router-dom'
import {useAppSelector} from "../../../app/store";
import {isLoggedInSelector, userAvatarSelector, userNameSelector} from "../../../app/selectors";
import {AppBar, Toolbar} from "@mui/material";
import logo from "../../../assest/logo.png";
import {PATH} from "../../../app/Path";
import s from "../Header/header.module.css"
import ava from "../../../assest/imgs/ava.png";
export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const name = useAppSelector(userNameSelector)
  const avatar = useAppSelector(userAvatarSelector)


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{
          justifyContent: "space-around"
        }}>
          <img src={logo} alt="logo" />
          <div className={s.navBlock}>
            <NavLink to={PATH.PROFILE} className={({ isActive }) => (isActive ? s.active : " ")}> Profile</NavLink>
            <NavLink to={PATH.REGISTRATION} className={({ isActive }) => (isActive ? s.active : " ")}>Registration</NavLink>
            <NavLink to={PATH.LOGIN} className={({ isActive }) => (isActive ? s.active : " ")}>Login</NavLink>
            <NavLink to={PATH["404"]} className={({ isActive }) => (isActive ? s.active : " ")}>ErrorPage</NavLink>
            <NavLink to={PATH.RECOVERY} className={({ isActive }) => (isActive ? s.active : " ")}>PasswordRecovery</NavLink>
            <NavLink to={PATH.NEWPASSWORD} className={({ isActive }) => (isActive ? s.active : " ")}>NewPasswordPage</NavLink>
          </div>
          {
            isLoggedIn || <NavLink to={PATH.LOGIN} className={({ isActive }) => (isActive ? s.active : " ")}>Sign in</NavLink>
          }
          {
            isLoggedIn &&  <span className={s.profileBlock}>
               <NavLink to={PATH.PROFILE} className={({ isActive }) => (isActive ? s.active : "")}>
                {name}
              </NavLink>
              <img src={avatar? avatar: ava } alt="avatar" className={s.profileImg} />
              </span>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
