import { useEffect, useState } from "react"
import { statusOfTables } from "../../../constants"
import { Loader } from "../../UI/Loader"
import { ErrorWindow } from "../../UI/Error"
import { getTableNameByStatus } from "./tools"
import { headers, selectTable } from "./templates"
import { fetchMainTableByStatus } from "../../../http/mainTablesThunk"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"

export const TableComponent: React.FC<{ status: string }> = ({ status }) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.mainTables)
  const { loading, error } = useAppSelector(state => state.mainTables)
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
          {headers[status].map((item: any, i: number) => (
            <th key={i}>{item}</th>
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