import { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { createAccountRequest } from "../../http/accountRequestThunk"
import { ApproveRequest } from "../approveRequest/ApproveRequest"
import { Dropdowns } from "../dropdowns"
import { PriceInput, QuantityInput, DecriptionInput } from "../UI/Inputs/index"
import { Modal } from "../UI/Modal"

const CreateAccountRequestModal = ({ setModal, setApprove, setRequestBody }) => {
  const { accountTypes, currencies, locations } = useAppSelector(state => state.dropdowns)
  const { price, quantity, description } = useAppSelector(state => state.modal)

  function submitHandler(e: FormEvent) {
    e.preventDefault()
    setRequestBody({
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description,
      typeID: accountTypes.currentId,
      currencyID: currencies.currentId,
      locationID: locations.currentId
    })
    setModal(false)
    setApprove(true)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <PriceInput />
      <QuantityInput />
      <DecriptionInput />
      <Dropdowns />
      <button>
        submit
      </button>
    </form>
  )
}

export const CreateAccountRequestButton = () => {
  const dispatch = useAppDispatch()
  const { createdRequestId } = useAppSelector(state => state.modal)
  console.log("createdRequestId:", createdRequestId)

  const [modal, setModal] = useState(false)
  const [approve, setApprove] = useState(false)
  const [requestBody, setRequestBody] = useState(null)

  function approveCallback() {
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
          setRequestBody={setRequestBody} />
      </Modal>
    )
  } else if (approve) {
    return (
      <ApproveRequest
        title="Submit create account request?"
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