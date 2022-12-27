import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchFarmersForTeamManage, fetchTeamNumbers } from "../../http/otherTablesThunk"
import { createPeriodForRequest } from "../../tools"
import { Modal } from "../UI/Modal"

const TeamManageModal = () => {
  const dispatch = useAppDispatch()
  const { period } = useAppSelector(state => state.mainTables)
  const { startDate, endDate } = createPeriodForRequest(period)
  const { farmersForTeamManage, teamNumbers } = useAppSelector(state => state.otherTable)

  useEffect(() => {
    dispatch(fetchFarmersForTeamManage(startDate, endDate))
    dispatch(fetchTeamNumbers())
  }, [dispatch, startDate, endDate])
  console.log(farmersForTeamManage, teamNumbers);

  if (farmersForTeamManage && teamNumbers) return (
    <div>{farmersForTeamManage} farmers and
      their {teamNumbers} teams ready for render</div>
  )
  return null
}

export const TeamManageButton = () => {
  const [modal, setModal] = useState(false)
  if (modal) return (
    <Modal visible={modal} setVisible={setModal}>
      <TeamManageModal />
    </Modal>
  )
  return (
    <button onClick={() => setModal(true)}>
      Open team manage
    </button>
  )
}