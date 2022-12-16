import { useDispatch } from "react-redux"
import { setApproveCreate } from "../../../redux/slice/outTableSlice"

const ApproveRequest = ({ approveTitle }) => {
  const dispatch = useDispatch()

  function approveHandler() {
    dispatch(setApproveCreate({ status: true }))
  }
  return (
    <div>
      <div>{approveTitle}</div>
      <div>
        <button>cancel</button>
        <button>approve</button>
      </div>
    </div>
  )
}

export const Modal = ({ visible, needApprove, approveTitle }) => {
  return (
    <div style={{ display: visible ? "flex" : "none" }}>
      <div>content</div>
      {needApprove &&
        <ApproveRequest approveTitle={approveTitle} />}
    </div>
  )
}