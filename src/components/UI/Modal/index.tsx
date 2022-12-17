import css from "./style.module.css"

export const Modal = ({ visible, setVisible, children }) => {
  return (
    <div
      className={css.wrapper}
      style={{ display: visible ? "flex" : "none" }}
      onClick={() => setVisible(false)}>
      <div
        className={css.content}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}