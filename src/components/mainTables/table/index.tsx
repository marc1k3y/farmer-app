import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { statusOfTables } from "../../../constants"
import { Loader } from "../../UI/Loader"
import { ErrorWindow } from "../../UI/Error"
import { getTableNameByStatus } from "./tools"
import { headers, selectTable } from "./templates"
import { fetchMainTableByStatus } from "../../../redux/slice/mainTablesSlice"

export const TableComponent: React.FC<{ status: string }> = ({ status }) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const state = useSelector(state => state.mainTables)
  // @ts-ignore
  const { loading, error } = useSelector(state => state.mainTables)
  const [currentOrder, setCurrentOrder] = useState(null)
  const tableName = getTableNameByStatus(statusOfTables, status)
  // @ts-ignore
  const currentTable = selectTable(status, state[tableName], currentOrder, setCurrentOrder)

  useEffect(() => {
    const request = {
      status, startDate: "", endDate: ""
    }
    dispatch(fetchMainTableByStatus(request))
  }, [dispatch, status])

  if (loading) return <Loader />
  if (error) return <ErrorWindow message={error} />
  if (currentTable) return (
    <table>
      <thead>
        <tr>
          {headers[status].map((item: any) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentTable}
      </tbody>
    </table>
  )
  return null
}