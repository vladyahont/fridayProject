import React, {useEffect} from 'react'
import error400 from '../../../assest/imgs/404.svg'
import {PATH} from "../../../app/Path";
import auth from "../../auth/auth.module.css";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import s from './ErrorPage.module.css'
import HomeIcon from '@mui/icons-material/Home';

export const ErrorPage = () => {

    const btnStyle = {
        width: '275px!important',
        color: 'white',
        textTransform: 'none!important'
    }

    return (
        <div className={s.container}>
            <h1>Error 404!</h1>
            <p>Page not found :(</p>
            <img src={error400}/>
            <div style={{margin: '0 auto'}}>
                <NavLink to={PATH.HOME} style={{textDecoration: 'none'}}>
                    <Button className={auth.button} sx={btnStyle} startIcon={<HomeIcon />}>
                        Return to the homepage
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}
