import { useState } from "react"
import css from "./style.module.css"

export const ErrorWindow = ({ message }) => {
  const [visible, setVisible] = useState(true)
  if (visible) return (
    <div className={css.wrapper}>
      <div>Error</div>
      <div>{message}</div>
      <button onClick={() => setVisible(false)}>ok</button>
    </div>
  )
  return null
}