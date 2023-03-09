import React, {useEffect} from 'react'

import { Header } from '../features/components/Header'
import './App.css'
import {Route, Routes} from "react-router-dom";
import {Profile} from "../features/components/profile/Profile";
import {Login} from "../features/auth/sing-in/Login";
import {Register} from "../features/auth/Register/Register";
import {ErrorPage} from "../features/components/ErrorPage";
import {PasswordRecovery} from "../features/components/PassworRecovery";
import {NewPasswordPage} from "../features/components/NewPasswordPage";
import {ShowSuperComp} from "../features/components/ShowSuperComp";
import {useAppDispatch, useAppSelector} from "./store";
import {appStatusSelector, isInitializedSelector} from "./selectors";
import {Loading} from "../features/components/Loading/Loading";
import {initializeProfileTC} from "../features/auth/auth-reducer";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(isInitializedSelector)
  const status = useAppSelector(appStatusSelector)

  // просим me
  useEffect(
    () => dispatch(initializeProfileTC()),[]
  )


  if(!isInitialized) {
    // ждем Me
    return <>
    <span> Здесь может быть ваша реклама</span>
    </>
  }

  return (
    <div>
      {status === "loading" && <Loading />}
      <Header />
      <Routes>
        <Route path={`/`} element={<Profile />} />
        <Route path={`/login`} element={<Login />} />
        {/*<Route path={`/registration`} element={<SignUp />} />*/}
        <Route path={`/registration`} element={<Register />} />
        <Route path={`/404`} element={<ErrorPage />} />
        <Route path={`/recovery`} element={<PasswordRecovery />} />
        <Route path={`/newPassword`} element={<NewPasswordPage />} />
        <Route path={`/test`} element={<ShowSuperComp />} />
      </Routes>
    </div>
  )
}

export default App
