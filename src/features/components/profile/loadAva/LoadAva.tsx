import React, {ChangeEvent} from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import s from '../profile.module.css'
import {useAppDispatch, useAppSelector} from "app/store";
import {userAvatarSelector, userNameSelector} from "app/selectors";
import {updUserDataTC} from "features/auth/auth-reducer";
import {fileConverter} from "utils/add-img-utils";

export const LoadAva = () => {

    const name = useAppSelector(userNameSelector)
    const ava = useAppSelector(userAvatarSelector)

    const dispatch = useAppDispatch()


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        fileConverter(e.target.files, (file64: string) => {
            dispatch(updUserDataTC(name, file64))
        })
    };

  return (
    <div className={s.avatarContainer}>
      <img src={ava} alt="avatar" className={s.imgAvatar} />
        <label>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
            />
            <PhotoCameraIcon
                className={s.iconAvatar}
                onClick={() => {}}
                //onClick={addAvaHandler}
            />
        </label>
    </div>
  )
}