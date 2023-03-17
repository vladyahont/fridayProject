import React, { useState } from 'react'

import s from './EditableSpanProfile.module.css'
import editIcon from './editIcon.svg'
import InputName from './inputName/InputName'

type PropsType = {
  value: string
  onChange: (value: string) => void
}

const EditableSpanProfile = React.memo(function ({ value, onChange }: PropsType) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const changeNameHandler = (newValue: string) => {
    setEditMode(false)
    onChange(newValue)
  }
  const activatedEditMode = () => {
    setEditMode(true)
  }

  return (
    <div className={s.container}>
      {editMode ? (
        <div>
          <InputName name={value} onChange={changeNameHandler} />
        </div>
      ) : (
        <div className={s.spanBlock}>
          <span className={s.spanText} onDoubleClick={activatedEditMode}>
            {value}
          </span>
          <img onClick={activatedEditMode} src={editIcon} className={s.pen} alt={'edit'} />
        </div>
      )}
    </div>
  )
})

export default EditableSpanProfile
