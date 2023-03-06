import React, {useCallback} from 'react'
import s from "./profile.module.css"
import avatar from "../../../assest/imgs/ava.png"
import {Logout} from "@mui/icons-material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import SuperEditableSpan from "../../../superComponents/c4-SuperEditableSpan/SuperEditableSpan";

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
      {/*----------------------------*/}
      {/*<div className={s.nameContainer}>
        <span className={s.nameText}>{name}</span>
        <DriveFileRenameOutlineIcon className={s.iconName}/>
      </div>*/}
      <SuperEditableSpan value={name} onChange={changeNameHandler}/>
      <span className={s.emailText}>{email}</span>
            {/*  <Button  startIcon={<Logout/>} onClick={logOutHandler}>
               Log out
               </Button>*/}
      <button className={s.btnLogAut} onClick={logOutHandler}>
        <Logout className={s.btnIcon}/>
        <div className={s.btnText}>
          Log out
        </div>
      </button>
    </div>
  );
}
