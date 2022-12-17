import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createAccountRequest } from "../../redux/slice/modalSlice"
import { ApproveRequest } from "../approveRequest/ApproveRequest"
import { Dropdowns } from "../dropdowns"
import { Modal } from "../UI/Modal"

const CreateAccountRequestModal = ({ setModal, setApprove, requestBody, setRequestBody }) => {
  const intRegex = new RegExp(/(^\d*$)/)
  const floatRegex = new RegExp(/(^\d*\.?\d*$)/)

  const [state, setState] = useState({
    price: "",
    quantity: "",
    typeID: "",
    currencyID: "",
    locationID: "",
    description: ""
  })

  function setPrice(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(floatRegex)) {
      setState({ ...state, price: e.target.value })
    }
  }

  function setQuantity(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(intRegex)) {
      setState({ ...state, quantity: e.target.value })
    }
  }

  function submitHandler() {
    setRequestBody(state)
    setModal(false)
    setApprove(true)
  }

  useEffect(() => {
    requestBody && setState(requestBody)
  }, [requestBody])
  return (
    <form>
      <input
        type="text"
        value={state.price || ""}
        onChange={(e) => setPrice(e)} />
      <input
        type="text"
        value={state.quantity || ""}
        onChange={(e) => setQuantity(e)} />
      <textarea
        cols={25} rows={2}
        value={state.description}
        // @ts-ignore
        onChange={(e) => setState({ ...state, description: e.target.value })} />
      <Dropdowns />
      <button onClick={submitHandler}>
        submit
      </button>
    </form>
  )
}

export const CreateAccountRequestButton = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { createdRequestId } = useSelector(state => state.modal)
  console.log("createdRequestId:", createdRequestId);

  const [modal, setModal] = useState(false)
  const [approve, setApprove] = useState(false)
  const [requestBody, setRequestBody] = useState(null)

  function approveCallback() {
    // @ts-ignore
    dispatch(createAccountRequest(requestBody))
    setApprove(false)
    console.log("dispatch", requestBody)
  }

  if (modal) {
    return (
      <Modal
        visible={modal}
        setVisible={setModal}>
        <CreateAccountRequestModal
          setModal={setModal}
          setApprove={setApprove}
          requestBody={requestBody}
          setRequestBody={setRequestBody} />
      </Modal>
    )
  } else if (approve) {
    return (
      <ApproveRequest
        title="Submit create account request"
        setModal={setModal}
        setApprove={setApprove}
        approveCallback={approveCallback} />
    )
  }
  else {
    return (
      <button onClick={() => setModal(true)}>
        Create account request
      </button>
    )
  }
}