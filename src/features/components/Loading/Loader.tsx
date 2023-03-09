import s from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader} />
    </div>
  )
}
