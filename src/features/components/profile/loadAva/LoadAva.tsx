import React from 'react';
import s from "../profile.module.css";
import avatar from "../../../../assest/imgs/ava.png";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export const LoadAva = () => {
  return (
    <div className={s.avatarContainer}>
      <img src={avatar} alt="avatar" className={s.imgAvatar}/>
      <PhotoCameraIcon className={s.iconAvatar}  onClick={() =>{
        console.log("tut")}}/>
    </div>
  );
};

