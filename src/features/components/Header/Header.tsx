import React from 'react'
import Box from "@mui/material/Box";
import {NavLink} from 'react-router-dom'
import {useAppSelector} from "../../../app/store";
import {isLoggedInSelector, userAvatarSelector, userNameSelector} from "../../../app/selectors";
import {AppBar, Toolbar} from "@mui/material";
import logo from "../../../assest/logo.png";

export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const name = useAppSelector(userNameSelector)
  //const avatar = useAppSelector(userAvatarSelector)


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{
          justifyContent: "space-around"
        }}>
          <img src={logo} alt="logo" />
          <div>
            <NavLink to={`/`}> Profile</NavLink> |
            <NavLink to={`/registration`}>Registration</NavLink> |
            <NavLink to={`/login`}>Login</NavLink> |
            <NavLink to={`/404`}>ErrorPage</NavLink> |
            <NavLink to={`/recovery`}>PasswordRecovery</NavLink> |
            <NavLink to={`/newPassword`}>NewPasswordPage</NavLink> |
            <NavLink to={`/test`}>ShowSuperComp</NavLink> |
          </div>
          {
            isLoggedIn || <div> sing in</div>
          }
          {
            isLoggedIn && <div> {name} </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
