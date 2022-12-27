import { roleId, workerNameInTableByRole } from "../../../constants"
import { useAppDispatch } from "../../../hooks/redux"
import { setCurrentOrder } from "../../../redux/slice/mainTablesSlice"
import { TableActions } from "../actions"
import { formatUnixDate, setRoleName } from "../../../tools"

export const PendingTable: React.FC<{ data: any }> = ({ data }) => {
  const headers = ["№", "Дата", "Количество", "Тип аккаунта", "Локация", workerNameInTableByRole[roleId], "Описание", "Команда"]
  const dispatch = useAppDispatch()
  function setOrderId(id) {
    dispatch(setCurrentOrder(id))
  }
  if (data) return (
    <table className="one-table-of-mainTables">
      <thead>
        <tr>
          {headers.map((item: any, i: number) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, i: number) => (
          <tr key={i} onClick={() => setOrderId(item._id)}>
            <td>{i + 1}</td>
            <td>{formatUnixDate(item.dateCreated)}</td>
            <td>{item.quantity}</td>
            <td>{item.type.name}</td>
            <td>{item.location.iso}</td>
            <td>{setRoleName(item)}</td>
            <td>{item.description}</td>
            <td>{item.team.id}</td>
            <TableActions status="0" rowId={item._id} />
          </tr>
        ))}
      </tbody>
    </table>
  )
  return null
}