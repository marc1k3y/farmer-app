import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { statusOfTables } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchTableByStatus } from "../../http/mainTablesThunk"
import { PeriodSelector } from "../PeriodSelector"
import { ErrorWindow } from "../UI/Error"
import { Loader } from "../UI/Loader"
import { TableNavigation } from "./TableNavigation"
import { PendingTable, InWorkTable, CompletedTable, DeclinedTable } from "./tables/index"

export const MainTables = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const { pending, inWork, completed, declined, loading, error } = useAppSelector(state => state.mainTables)
  const routes = [
    { id: 1, path: "/pending", element: <PendingTable data={pending} /> },
    { id: 2, path: "/inWork", element: <InWorkTable data={inWork} /> },
    { id: 3, path: "/completed", element: <CompletedTable data={completed} /> },
    { id: 4, path: "/declined", element: <DeclinedTable data={declined} /> }
  ]
  useEffect(() => {
    const currentTable = pathname.split("/")[2]
    const request = {
      status: statusOfTables[currentTable], startDate: "", endDate: ""
    }
    dispatch(fetchTableByStatus(request))
  }, [dispatch, pathname])

  if (loading) return <Loader />
  if (error) return <ErrorWindow message={error} />
  return (
    <div>
      <PeriodSelector />
      <TableNavigation />
      <Routes>
        {routes.map(route => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}