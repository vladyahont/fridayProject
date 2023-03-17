import React from 'react'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

import avatar from '../../../../assest/imgs/ava.png'
import s from '../profile.module.css'

export const LoadAva = () => {
  return (
    <div className={s.avatarContainer}>
      <img src={avatar} alt="avatar" className={s.imgAvatar} />
      <PhotoCameraIcon
        className={s.iconAvatar}
        onClick={() => {
          console.log('tut')
        }}
      />
    </div>
  )
}
