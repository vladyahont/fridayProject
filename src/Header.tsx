import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {Registration} from "./Registration";
import {Profile} from "./Profile";
import {ErrorPage} from "./ErrorPage";
import {PasswordRecovery} from "./PassworRecovery";
import {NewPasswordPage} from "./NewPasswordPage";
import {ShowSuperComp} from "./ShowSuperComp";

const Header = () => {

    const base = '/fridayProject'

    return (
        <div>
            <Routes>
                <Route path={`${base}/`} element={<Profile/>}/>
                <Route path={`${base}/login`} element={<Login/>}/>
                <Route path={`${base}/registration`} element={<Registration/>}/>
                <Route path={`${base}/404`} element={<ErrorPage/>}/>
                <Route path={`${base}/recovery`} element={<PasswordRecovery/>}/>
                <Route path={`${base}/newPassword`} element={<NewPasswordPage/>}/>
                <Route path={`${base}/test`} element={<ShowSuperComp/>}/>
            </Routes>
            <NavLink to={`${base}/`}>Profile</NavLink>|
            <NavLink to={`${base}/login`}>Login</NavLink> |
            <NavLink to={`${base}/registration`}>Registration</NavLink> |
            <NavLink to={`${base}/404`}>ErrorPage</NavLink> |
            <NavLink to={`${base}/recovery`}>PasswordRecovery</NavLink> |
            <NavLink to={`${base}/newPassword`}>NewPasswordPage</NavLink> |
            <NavLink to={`${base}/test`}>ShowSuperComp</NavLink> |
        </div>
    );
};

export default Header;