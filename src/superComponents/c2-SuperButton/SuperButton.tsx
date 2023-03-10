import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: 'logout' | 'save'
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps
}) => {
  /*  const finalClassName =(disabled
            ? ' ' + s.disabled : xType === 'logAut'
                ? ' ' + s.logAut : xType === 'secondary'
                    ? ' ' + s.secondary : ' ' + s.default)
        + (className ? ' ' + className : s.button)*/
  // eslint-disable-next-line no-nested-ternary
  let finalClassName = disabled
    ? ' ' + s.disabled
    : // eslint-disable-next-line no-nested-ternary
    xType === 'logout'
    ? ' ' + s.logAut
    : xType === 'save'
    ? ' ' + s.safe
    : ' ' + s.default

  finalClassName += className ? ' ' + className : ' ' + s.button

  return <button disabled={disabled} className={finalClassName} {...restProps} />
}

export default SuperButton
