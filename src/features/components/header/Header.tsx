import React from 'react'
import Box from "@mui/material/Box";
import {NavLink} from 'react-router-dom'
import {useAppSelector} from "../../../app/store";
import {isLoggedInSelector, userAvatarSelector, userNameSelector} from "../../../app/selectors";
import {AppBar, Toolbar} from "@mui/material";
import logo from "../../../assest/logo.png";
import {PATH} from "../../../app/Path";
import s from ".//header.module.css"
import ava from "../../../assest/imgs/ava.png";
export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const name = useAppSelector(userNameSelector)
  const avatar = useAppSelector(userAvatarSelector)


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{
          justifyContent: "space-between"
        }}>
          <>
            <img src={logo} alt="logo" />
            {
                isLoggedIn || <NavLink to={PATH.LOGIN} className={s.loginBtn}>Sign in</NavLink>
            }
            {
                isLoggedIn &&  <span className={s.profileBlock}>
              <NavLink to={PATH.PROFILE} className={({ isActive }) => (isActive ? s.active : "")}>
                {name}
              </NavLink>
              <img src={avatar? avatar: ava } alt="avatar" className={s.profileImg} />
              </span>
            }
          </>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
