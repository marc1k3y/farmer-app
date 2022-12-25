import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { fetchOrderInfoById, updateAccountRequest } from "../../../http/accountRequestThunk"
import { ApproveRequest } from "../../approveRequest/ApproveRequest"
import { Dropdowns } from "../../dropdowns"
import { PriceInput, QuantityInput, DecriptionInput } from "../../UI/Inputs/index"
import { Modal } from "../../UI/Modal"

const UpdateAccountRequestModal = ({ setModal, setApprove }) => {

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

export const UpdateAction = () => {
  const dispatch = useAppDispatch()
  const { accountTypes, currencies, locations } = useAppSelector(state => state.dropdowns)
  const { price, quantity, description } = useAppSelector(state => state.modal)
  const { currentOrder } = useAppSelector(state => state.mainTables)

  const [modal, setModal] = useState(false)
  const [approve, setApprove] = useState(false)

  function approveCallback() {
    const requestBody = {
      requestID: currentOrder,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description,
      typeID: accountTypes.currentId,
      currencyID: currencies.currentId,
      locationID: locations.currentId
    }
    dispatch(updateAccountRequest(requestBody))
    setApprove(false)
    console.log("dispatch", requestBody)
  }

  useEffect(() => {
    currentOrder && dispatch(fetchOrderInfoById(currentOrder))
  }, [currentOrder, dispatch])

  if (modal) {
    return (
      <Modal
        visible={modal}
        setVisible={setModal}>
        <UpdateAccountRequestModal
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
        Update account request
      </button>
    )
  }
}