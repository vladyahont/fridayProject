import React from 'react'

import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div>
      <NavLink to={`/`}>Profile</NavLink> |<NavLink to={`/registration`}>Registration</NavLink> |
      <NavLink to={`/login`}>Login</NavLink> |<NavLink to={`/404`}>ErrorPage</NavLink> |
      <NavLink to={`/recovery`}>PasswordRecovery</NavLink> |
      <NavLink to={`/newPassword`}>NewPasswordPage</NavLink> |
      <NavLink to={`/test`}>ShowSuperComp</NavLink> |
    </div>
  )
}
