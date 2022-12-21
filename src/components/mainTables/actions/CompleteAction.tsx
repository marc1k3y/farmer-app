import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { fetchOrderInfoById } from "../../../http/accountRequestThunk"
import { ApproveRequest } from "../../approveRequest/ApproveRequest"
import { Dropdowns } from "../../dropdowns"
import { PriceInput, QuantityInput, DecriptionInput } from "../../UI/Inputs/index"
import { Modal } from "../../UI/Modal"

const CompleteAccountRequestModal = ({ setModal, setApprove }) => {

  function submitHandler() {
    setModal(false)
    setApprove(true)
  }

  return (
    <form>
      <PriceInput />
      <QuantityInput />
      <DecriptionInput />
      <Dropdowns />
      <button onClick={submitHandler}>
        submit
      </button>
    </form>
  )
}

export const CompleteAction = ({ orderId }: { orderId: string }) => {
  const dispatch = useAppDispatch()
  const { accountTypes, currencies, locations } = useAppSelector(state => state.dropdowns)
  const { price, quantity, valid, team, description } = useAppSelector(state => state.modal)

  const [modal, setModal] = useState(false)
  const [approve, setApprove] = useState(false)

  function approveCallback() {
    const requestBody = {
      requestID: orderId,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      valid: parseInt(valid),
      team: parseInt(team),
      description: description,
      typeID: accountTypes.currentId,
      currencyID: currencies.currentId,
      locationID: locations.currentId
    }
    // dispatch(completeAccountRequest(requestBody))
    setApprove(false)
    console.log("dispatch", requestBody)
  }

  useEffect(() => {
    orderId && dispatch(fetchOrderInfoById(orderId))
  }, [orderId, dispatch])

  if (modal) {
    return (
      <Modal
        visible={modal}
        setVisible={setModal}>
        <CompleteAccountRequestModal
          setModal={setModal}
          setApprove={setApprove} />
      </Modal>
    )
  } else if (approve) {
    return (
      <ApproveRequest
        title="Submit complete account request?"
        setModal={setModal}
        setApprove={setApprove}
        approveCallback={approveCallback} />
    )
  }
  else {
    return (
      <button onClick={() => setModal(true)}>
        Complete account request
      </button>
    )
  }
}