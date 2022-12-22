import { Routes, Route } from "react-router-dom"
import { statusOfTables } from "../../constants"
import { TableComponent } from "./table"
import { TableNavigation } from "./TableNavigation"

export const MainTables = () => {
  const routes = [
    { id: 1, path: "/pending", element: <TableComponent status={statusOfTables.pending} /> },
    { id: 2, path: "/inWork", element: <TableComponent status={statusOfTables.inWork} /> },
    { id: 3, path: "/completed", element: <TableComponent status={statusOfTables.completed} /> },
    { id: 4, path: "/declined", element: <TableComponent status={statusOfTables.declined} /> },
  ]
  return (
    <div>
      <TableNavigation />
      <Routes>
        {routes.map(route => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}