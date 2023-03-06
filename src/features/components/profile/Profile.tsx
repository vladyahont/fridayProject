import React, { useCallback } from 'react'

import { Logout } from '@mui/icons-material'

import SuperButton from '../../../superComponents/c2-SuperButton/SuperButton'

import EditableSpanProfile from './editSpan/EditableSpanProfile'
import { LoadAva } from './loadAva/LoadAva'
import s from './profile.module.css'

export const Profile = () => {
  //useSelect
  const email = 'j&johnson@gmail.com'
  const value = 'ivan'
  const isLoggedIn = true

  if (!isLoggedIn) {
    return <div>redirect</div>
  }

  const logOutHandler = useCallback(() => {}, [])

  const changeNameHandler = useCallback(
    (value: string) => {
      //запрос
      alert(value)
    },
    [value]
  )

  return (
    <div className={s.profileBlock}>
      <span className={s.title}>Personal Information</span>
      <LoadAva />
      <div className={s.nameContainer}>
        <EditableSpanProfile value={value} onChange={changeNameHandler} />
      </div>
      <span className={s.emailText}>{email}</span>
      <SuperButton className={s.btnLogAut} onClick={logOutHandler} xType={'logAut'}>
        <Logout className={s.btnIcon} />
        <div className={s.btnText}>Log out</div>
      </SuperButton>
    </div>
  )
}
