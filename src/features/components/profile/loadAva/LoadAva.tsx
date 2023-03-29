import React, {ChangeEvent, useState} from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import s from '../profile.module.css'
import {useAppDispatch, useAppSelector} from "app/store";
import {userAvatarSelector, userNameSelector} from "app/selectors";
import {updUserDataTC} from "features/auth/auth-reducer";

export const LoadAva = () => {

    const name = useAppSelector(userNameSelector)
    const ava = useAppSelector(userAvatarSelector)

    const dispatch = useAppDispatch()

    const [img, setImg] = useState('')


    const addAvaHandler = () => {
        console.log('call addAvaHandler')
        dispatch(updUserDataTC(name, img))
    }



    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
                const reader = new FileReader();

                reader.onloadend = () => {
                    const file64 = reader.result as string
                    //console.log('file64: ', file64)
                    dispatch(updUserDataTC(name, file64))
                }
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
                reader.readAsDataURL(file)

            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
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
