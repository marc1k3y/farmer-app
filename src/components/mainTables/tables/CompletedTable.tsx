import { roleId, workerNameInTableByRole } from "../../../constants"
import { useAppDispatch } from "../../../hooks/redux"
import { setCurrentOrder } from "../../../redux/slice/mainTablesSlice"
import { TableActions } from "../actions"
import { formatUnixDate, setRoleName } from "./tools"

export const CompletedTable: React.FC<{ data: any }> = ({ data }) => {
  const headers = ["№", "Дата создания", "Дата закрытия", "Количество", "Валидных", "Цена", "Итого", "Валюта", "Тип аккаунта", "Локация", workerNameInTableByRole[roleId], "Описание", "Команда", "Действия"]
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
            <td>{formatUnixDate(item.dateCompleted)}</td>
            <td>{item.quantity}</td>
            <td>{item.valid}</td>
            <td>{item.price}</td>
            <td>{item.total}</td>
            <td>{item.currency.iso}</td>
            <td>{item.type.name}</td>
            <td>{item.location.iso}</td>
            <td>{setRoleName(item)}</td>
            <td>{item.description}</td>
            <td>{item.team.id}</td>
            <TableActions status="2" rowId={item._id} />
          </tr>
        ))}
      </tbody>
    </table>
  )
  return null
}