import React, { useEffect } from 'react'
import { Header } from '../features/components/Header/Header'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from '../features/components/profile/Profile'
import { Login } from '../features/auth/sing-in/Login'
import { ErrorPage } from '../features/components/ErrorPage/ErrorPage'
import { PasswordRecovery } from '../features/components/PassworRecovery'
import { NewPasswordPage } from '../features/components/NewPasswordPage'
import { useAppDispatch, useAppSelector } from './store'
import { initializeProfileTC } from '../features/auth/auth-reducer'
import {SignUp} from "../features/auth/sign-up/SignUp";
import {PATH} from "./Path";
import {Loading} from "../features/components/Loading/Loading";
import {Loader} from "../features/components/Loading/Loader";
import {appStatusSelector, isInitializedSelector} from "./selectors";
import {DevFooter} from "../features/components/DevFooter/DevFooter";
import {Packs} from "../features/packs/Packs";

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(isInitializedSelector)
  const status = useAppSelector(appStatusSelector)

  // просим me
  useEffect(() => {
      dispatch(initializeProfileTC())
  }, [dispatch])

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
        <Route path={PATH.REGISTRATION} element={<SignUp />} />
        <Route path={PATH['404']} element={<ErrorPage />} />
        <Route path={PATH.RECOVERY} element={<PasswordRecovery />} />
        <Route path={PATH.NEWPASSWORD} element={<NewPasswordPage />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={'*'} element={<Navigate to={PATH['404']} />} />
      </Routes>
      <DevFooter/>
    </div>
  )
}

export default App
