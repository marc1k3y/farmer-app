import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchTeamleadListTable } from "../../http/otherTablesThunk"
import { createPeriodForRequest } from "../../tools"
import { Modal } from "../UI/Modal"

const TeamleadListModal = () => {
  const dispatch = useAppDispatch()
  const { period } = useAppSelector(state => state.mainTables)
  const { startDate, endDate } = createPeriodForRequest(period)
  const { teamLeads } = useAppSelector(state => state.otherTable)
  useEffect(() => {
    dispatch(fetchTeamleadListTable(startDate, endDate))
  }, [])
  console.log(teamLeads);

  return (
    <div></div>
  )
}

export const TeamleadListButton = () => {
  const [modal, setModal] = useState(false)
  if (modal) return (
    <Modal visible={modal} setVisible={setModal}>
      <TeamleadListModal />
    </Modal>
  )
  return (
    <button onClick={() => setModal(true)}>
      Open temamlead lsit
    </button>
  )
}