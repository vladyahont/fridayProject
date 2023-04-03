import React from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import s from "./BackToRouteButton.module.css"

type propsType = {
  title: string
  route: string
}

export const BackToRouteButton = (props: propsType) => {
  const navigate = useNavigate()

  const backButtonHandler = () => {
    navigate(props.route)
  }

  return (
    <div className={s.backButton} onClick={backButtonHandler}>
      <KeyboardBackspace />
      <div className={s.backButtonTitle}>{props.title}</div>
    </div>
  )
}