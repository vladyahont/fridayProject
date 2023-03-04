import React from 'react'
import s from "./profile.module.css"
import avatar from "../../../assest/imgs/ava.png"
import {Logout} from "@mui/icons-material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export const Profile = () => {

  let LogOutHandler = () => {

  };
  return (
    <div className={s.profileBlock}>
      <span className={s.title}>Personal Information</span>
      <div className={s.avatarContainer}>
        <img src={avatar} alt="avatar" className={s.imgAvatar}/>
        <PhotoCameraIcon className={s.iconAvatar}/>
      </div>
      <div className={s.nameContainer}>
        <span className={s.nameText}>Ivan</span>
        <DriveFileRenameOutlineIcon className={s.iconName}/>
      </div>
      <span className={s.emailText}>j&johnson@gmail.com</span>
            {/*  <Button  startIcon={<Logout/>} onClick={LogOutHandler}>
               Log out
               </Button>*/}
      <button className={s.btnLogAut}>
        <Logout className={s.btnIcon}/>
        <div className={s.btnText}>
          Log out
        </div>
      </button>
    </div>
  );
}
