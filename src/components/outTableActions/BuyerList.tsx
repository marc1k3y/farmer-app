import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchBuyerListTable } from "../../http/otherTablesThunk"
import { createPeriodForRequest } from "../../tools"
import { Modal } from "../UI/Modal"

const BuyerListModal = () => {
  const dispatch = useAppDispatch()
  const { period } = useAppSelector(state => state.mainTables)
  const { startDate, endDate } = createPeriodForRequest(period)
  const { teamleadId, buyers } = useAppSelector(state => state.otherTable)
  useEffect(() => {
    dispatch(fetchBuyerListTable(startDate, endDate, teamleadId))
  }, [dispatch, startDate, endDate, teamleadId])
  console.log(buyers);

  if (buyers) return (
    <div>{buyers} ready for maps</div>
  )
  return null
}

export const BuyerListButton = () => {
  const [modal, setModal] = useState(false)
  if (modal) return (
    <Modal visible={modal} setVisible={setModal}>
      <BuyerListModal />
    </Modal>
  )
  return (
    <button onClick={() => setModal(true)}>
      Open buyers list
    </button>
  )
}