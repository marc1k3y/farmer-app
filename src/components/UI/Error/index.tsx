import css from "./style.module.css"

export const ErrorWindow = ({ message }) => {
  return (
    <div className={css.wrapper}>
      <div>Error</div>
      <div>{message}</div>
    </div>
  )
}