import React from 'react'

import { useFormik } from 'formik'

import SuperButton from '../../../../../superComponents/c2-SuperButton/SuperButton'

import s from './inputName.module.css'

type PropsType = {
  name: string
  onChange: (v: string) => void
}
const InputName = (props: PropsType) => {
  const formik = useFormik({
    initialValues: {
      name: props.name,
    },
    validate: values => {
      if (!values.name)
        return {
          name: 'Name is required',
        }
    },
    onSubmit: values => {
      props.onChange(values.name)
    },
  })
  const handleSubmit = () => formik.handleSubmit()
  const error = formik.errors.name as string

  return (
    <form className={s.formContainer} onSubmit={formik.handleSubmit}>
      <label className={s.formLabel}>Nick Name</label>
      <div className={s.form}>
        <input
          className={s.formInput}
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <SuperButton type="submit" xType={'save'} onClick={handleSubmit}>
          SAVE
        </SuperButton>
      </div>
      {formik.errors.name ? <span className={s.error}>{error}</span> : null}
    </form>
  )
}

export default InputName
