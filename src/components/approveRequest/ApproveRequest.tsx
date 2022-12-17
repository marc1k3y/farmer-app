import css from "./style.module.css"

export const ApproveRequest = (
  { title, setModal, setApprove, approveCallback }) => {
  function cancelHandler() {
    setApprove(false)
    setModal(true)
  }
  return (
    <div className={css.wrapper}>
      <div>{title}</div>
      <div>
        <button onClick={cancelHandler}>
          cancel
        </button>
        <button onClick={approveCallback}>
          approve
        </button>
      </div>
    </div>
  )
}