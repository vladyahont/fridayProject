import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {PasswordRecovery} from "./PassworRecovery";
import {NewPasswordPage} from "./NewPasswordPage";
import {ShowSuperComp} from "./ShowSuperComp";
import {ErrorPage} from "./ErrorPage";
import {Profile} from "./Profile";
import {Registration} from "./Registration";
import {Login} from "./Login";

function App() {

  const base = '/fridayProject'

  return (

    <div>
      <Routes>
        <Route path={`${base}/login`} element={<Login/>}/>
        <Route path={`${base}/registration`} element={<Registration/>}/>
        <Route path={`${base}/`} element={<Profile/>}/>
        <Route path={`${base}/404`} element={<ErrorPage/>}/>
        <Route path={`${base}/recovery`} element={<PasswordRecovery/>}/>
        <Route path={`${base}/newPassword`} element={<NewPasswordPage/>}/>
        <Route path={`${base}/test`} element={<ShowSuperComp/>}/>
      </Routes>
    </div>
  );
}

export default App;
