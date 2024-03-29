import React, {useCallback, useEffect} from 'react'

import {Logout} from '@mui/icons-material'

import SuperButton from '../../../superComponents/c2-SuperButton/SuperButton'

import EditableSpanProfile from './editSpan/EditableSpanProfile'
import {LoadAva} from './loadAva/LoadAva'
import s from './profile.module.css'
import backIcon from "../../../assest/imgs/icons/back.svg"
import {useAppDispatch, useAppSelector} from "app/store";

import {logoutTC, updUserDataTC} from "../../auth/auth-reducer";
import { useNavigate} from "react-router-dom";
import {isLoggedInSelector, userEmailSelector, userNameSelector} from "app/selectors";
import {PATH} from "app/Path";


export const Profile = () => {

  const dispatch = useAppDispatch()

  const name = useAppSelector(userNameSelector)
  const email = useAppSelector(userEmailSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const navigate = useNavigate()

  useEffect(
    () => {  !isLoggedIn && navigate(`${PATH.LOGIN}`)
  }, [isLoggedIn])

  const logOutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  const changeNameHandler = useCallback(
    (name: string) => {
      dispatch(updUserDataTC(name))
    },
    [name]
  )
  const onBackToPackList = () => {
    console.log("onBackToPackList")
  }

  return (
    <>
      <div className={s.backBlock} onClick = {onBackToPackList}>
        <img src={backIcon} alt=" "/>
        <span>Back to Packs List</span>
      </div>
      <div className={s.profileContainer}>
        <div className={s.profileBlock}>
          <span className={s.title}>Personal Information</span>
          <LoadAva/>
          <div className={s.nameContainer}>
            <EditableSpanProfile value={name} onChange={changeNameHandler}/>
          </div>
          <span className={s.emailText}>{email}</span>
          <SuperButton className={s.btnLogout} onClick={logOutHandler} xType={'logout'}>
            <Logout className={s.btnIcon}/>
            <div className={s.btnText}>Log out</div>
          </SuperButton>
        </div>
      </div>
    </>
  )
}
