import React, {useCallback} from 'react'
import s from "./profile.module.css"
import avatar from "../../../assest/imgs/ava.png"
import {Logout} from "@mui/icons-material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import SuperEditableSpan from "../../../superComponents/c4-SuperEditableSpan/SuperEditableSpan";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";

export const Profile = () => {
  //useSelect
  const email = "j&johnson@gmail.com"
  const name = "Ivan"

  let logOutHandler = useCallback(() => {
  },[]);

  const changeNameHandler = useCallback(() =>{},[name])

  return (
    <div className={s.profileBlock}>
      <span className={s.title}>Personal Information</span>
      {/*вынести в отдельную компоненту с функционалом подгрузки своей авы с файла*/}
      <div className={s.avatarContainer}>
        <img src={avatar} alt="avatar" className={s.imgAvatar}/>
        <PhotoCameraIcon className={s.iconAvatar}/>
      </div>
      <SuperEditableSpan value={name} onChange={changeNameHandler}/>
      <span className={s.emailText}>{email}</span>
      <SuperButton className={s.btnLogAut} onClick={logOutHandler} xType={"logAut"}>
        <Logout className={s.btnIcon}/>
        <div className={s.btnText}>
          Log out
        </div>
      </SuperButton>
    </div>
  );
}
