import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchFarmerListTable } from "../../http/otherTablesThunk"
import { createPeriodForRequest } from "../../tools"
import { Modal } from "../UI/Modal"

export const FarmerListButton = () => {
  const [modal, setModal] = useState(false)
  if (modal) return (
    <Modal visible={modal} setVisible={setModal}>
      <FarmerListModal />
    </Modal>
  )
  return (
    <button onClick={() => setModal(true)}>
      Open farmer list
    </button>
  )
}

const FarmerListModal = () => {
  const dispatch = useAppDispatch()
  const { period } = useAppSelector(state => state.mainTables)
  const { startDate, endDate } = createPeriodForRequest(period)
  const { farmers } = useAppSelector(state => state.otherTable)
  useEffect(() => {
    dispatch(fetchFarmerListTable(startDate, endDate))
  }, [dispatch, startDate, endDate])
  console.log(farmers);

  if (farmers) return (
    <div></div>
  )
}