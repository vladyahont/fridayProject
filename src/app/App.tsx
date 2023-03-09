import React, { useEffect } from 'react'

import { Header } from '../features/components/Header'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from '../features/components/profile/Profile'
import { Login } from '../features/auth/sing-in/Login'
import { Register } from '../features/auth/Register/Register'
import { ErrorPage } from '../features/components/ErrorPage'
import { PasswordRecovery } from '../features/components/PassworRecovery'
import { NewPasswordPage } from '../features/components/NewPasswordPage'
import { ShowSuperComp } from '../features/components/ShowSuperComp'
import { useAppDispatch, useAppSelector } from './store'
import { appStatusSelector, isInitializedSelector } from './selectors'
import { Loading } from '../features/components/Loading/Loading'
import { initializeProfileTC } from '../features/auth/auth-reducer'
import { PATH } from './Path'
import { Loader } from '../features/components/Loading/Loader'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(isInitializedSelector)
  const status = useAppSelector(appStatusSelector)

  // просим me
  useEffect(() => dispatch(initializeProfileTC()), [])

  if (!isInitialized) {
    // ждем Me
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <div>
      {status === 'loading' && <Loading />}
      <Header />
      <Routes>
        <Route path={`/`} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        {/*<Route path={`/registration`} element={<SignUp />} />*/}
        <Route path={PATH.REGISTRATION} element={<Register />} />
        <Route path={PATH['404']} element={<ErrorPage />} />
        <Route path={PATH.RECOVERY} element={<PasswordRecovery />} />
        <Route path={PATH.NEWPASSWORD} element={<NewPasswordPage />} />
        <Route path={'*'} element={<Navigate to={PATH['404']} />} />
      </Routes>
    </div>
  )
}

export default App
