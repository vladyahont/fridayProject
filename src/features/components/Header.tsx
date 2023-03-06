import React from 'react'

import { NavLink, Route, Routes } from 'react-router-dom'

import { SignUp } from '../auth/sign-up/SignUp'
import { Login } from '../auth/sing-in/Login'

import { ErrorPage } from './ErrorPage'
import { NewPasswordPage } from './NewPasswordPage'
import { PasswordRecovery } from './PassworRecovery'
import { Profile } from './profile/Profile'
import { ShowSuperComp } from './ShowSuperComp'

export const Header = () => {
  const base = '/fridayProject'

  return (
    <div>
      <Routes>
        <Route path={`${base}/`} element={<Profile />} />
        <Route path={`${base}/login`} element={<Login />} />
        <Route path={`${base}/registration`} element={<SignUp />} />
        <Route path={`${base}/404`} element={<ErrorPage />} />
        <Route path={`${base}/recovery`} element={<PasswordRecovery />} />
        <Route path={`${base}/newPassword`} element={<NewPasswordPage />} />
        <Route path={`${base}/test`} element={<ShowSuperComp />} />
      </Routes>
      <NavLink to={`${base}/`}>Profile</NavLink> |
      <NavLink to={`${base}/registration`}>Registration</NavLink> |
      <NavLink to={`${base}/login`}>Login</NavLink> |<NavLink to={`${base}/404`}>ErrorPage</NavLink>{' '}
      |<NavLink to={`${base}/recovery`}>PasswordRecovery</NavLink> |
      <NavLink to={`${base}/newPassword`}>NewPasswordPage</NavLink> |
      <NavLink to={`${base}/test`}>ShowSuperComp</NavLink> |
    </div>
  )
}
