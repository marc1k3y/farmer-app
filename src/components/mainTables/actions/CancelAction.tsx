import { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { sendCancelReason } from "../../../http/mainTablesThunk"
import { ApproveRequest } from "../../approveRequest/ApproveRequest"
import { Modal } from "../../UI/Modal"

const CancelReasonModal = ({ setModal, setApprove, setReason }) => {

  function submitHandler(e: FormEvent) {
    e.preventDefault()
    setApprove(true)
    setModal(false)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <input type="text" onChange={(e) => setReason(e.target.value)} />
      <button>send</button>
    </form>
  )
}

export const CancelAction = () => {
  const dispatch = useAppDispatch()
  const { currentOrder } = useAppSelector(state => state.mainTables)
  const [modal, setModal] = useState(false)
  const [approve, setApprove] = useState(false)
  const [reason, setReason] = useState("")

  function approveCallback() {
    dispatch(sendCancelReason(currentOrder, reason))
    setApprove(false)
  }

  if (modal) return (
    <Modal
      visible={modal}
      setVisible={setModal}>
      <CancelReasonModal
        setModal={setModal}
        setApprove={setApprove}
        setReason={setReason} />
    </Modal>
  )
  if (approve) return (
    <ApproveRequest
      title="Submit cancel account request?"
      setModal={setModal}
      setApprove={setApprove}
      approveCallback={approveCallback} />
  )
  return (
    <button onClick={() => setModal(true)}>
      cancel
    </button>
  )
}