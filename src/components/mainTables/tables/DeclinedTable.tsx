import { useAppDispatch } from "../../../hooks/redux"
import { setCurrentOrder } from "../../../redux/slice/mainTablesSlice"
import { TableActions } from "../actions"
import { formatUnixDate } from "../../../tools"

export const DeclinedTable: React.FC<{ data: any }> = ({ data }) => {
  const headers = ["№", "Дата создания", "Дата отмены", "Тип аккаунта", "Локация", "Отменил", "Причина отмены", "Действия"]
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
            <td>{formatUnixDate(item.dateCancelled)}</td>
            <td>{item.type.name}</td>
            <td>{item.location.iso}</td>
            <td>{item.cancelledBy.fullName}</td>
            <td>{item.cancellationCause}</td>
            <TableActions status="3" rowId={item._id} />
          </tr>
        ))}
      </tbody>
    </table>
  )
  return null
}