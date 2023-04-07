import React, { useEffect } from 'react'

import { Header } from 'features/components/header/Header'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from 'features/components/profile/Profile'
import { Login } from 'features/auth/singIn/Login'
import { useAppDispatch, useAppSelector } from './store'
import { initializeProfileTC } from 'features/auth/auth-reducer'
import {SignUp} from "features/auth/signUp/SignUp";
import {PATH} from "./Path";
import {Loading} from "features/components/loading/Loading";
import {Loader} from "features/components/loading/Loader";
import {appStatusSelector, isInitializedSelector} from "./selectors";
import {DevFooter} from "features/components/devFooter/DevFooter";
import {CheckEmail} from "features/auth/recoveryPassword/checkEmail/CheckEmail";
import {ErrorPage} from "features/components/errorPage/ErrorPage";
import {PasswordRecovery} from "features/auth/recoveryPassword/PasswordRecovery";
import {NewPassword} from "features/auth/recoveryPassword/creadeNew/NewPassword";


import {Packs} from "../features/pages/packPage/Packs";
import {Cards} from "../features/pages/cardPage/Cards";

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
          <Route path={PATH.REGISTRATION} element={<SignUp />} />
          <Route path={PATH['400']} element={<ErrorPage />} />
          <Route path={PATH.RECOVERY} element={<PasswordRecovery />} />
          <Route path={PATH.NEWPASSWORD} element={<NewPassword />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.CARDS} element={<Cards />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={'*'} element={<Navigate to={PATH['400']} />} />
        </Routes>
        <DevFooter/>
    </div>
  )
}

export default App
