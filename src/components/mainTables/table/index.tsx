import { useEffect, useState } from "react"
import { roles } from "../../roles"
import { TableActions } from "../actions"
import { convertDate, setRoleName } from "./tools"
import { roleId, statusOfTables } from "../../../constants"
import { useDispatch, useSelector } from "react-redux"
import { fetchMainTableByStatus } from "../../../redux/slice/mainTableSlice"
import { Loader } from "../../UI/Loader"
import { ErrorWindow } from "../../UI/Error"

const emptyPeriod = { startDate: "", endDate: "" } // temp

const headers = {
  1: ["№", "Дата", "Количество", "Тип аккаунта", "Локация", roles[parseInt(roleId)]["roleName"], "Описание", "Команда", "Действия"],
  2: ["№", "Дата", "Количество", "Тип аккаунта", "Локация", roles[parseInt(roleId)]["roleName"], "Описание", "Команда", "Действия"],
  3: ["№", "Дата создания", "Дата закрытия", "Количество", "Валидных", "Цена", "Итого", "Валюта", "Тип аккаунта", "Локация", roles[parseInt(roleId)]["roleName"], "Описание", "Команда", "Действия"],
  4: ["№", "Дата создания", "Дата отмены", "Тип аккаунта", "Локация", "Отменил", "Причина отмены", "Действия"],
}

  const PendingTemplate = (pending) => {
    if () return (
      // @ts-ignore
      pendingData.map((item, index) => (
        <tr key={index} onClick={() => setCurrentOrder(item._id)}>
          <td>{index + 1}</td>
          <td>{convertDate(item.dateCreated)}</td>
          <td>{item.quantity}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{setRoleName(item)}</td>
          <td>{item.description}</td>
          <td>{item.team.id}</td>
          <TableActions payload={currentOrder} status={statusOfTables.pending} />
        </tr>
      ))
    )
  }

  const InWorkTemplate = (inWork) => {
    if () return (
      // @ts-ignore
      inWorkData.map((item, index) => (
        <tr key={index} onClick={() => setCurrentOrder(item._id)}>
          <td>{index + 1}</td>
          <td>{convertDate(item.dateCreated)}</td>
          <td>{item.quantity}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{setRoleName(item)}</td>
          <td>{item.description}</td>
          <td>{item.team.id}</td>
          <TableActions payload={currentOrder} status={statusOfTables.inWork} />
        </tr>
      ))
    )
  }

  const CompletedTemplate = (completed) => {
    if () return (
      // @ts-ignore
      completedData.map((item, index) => (
        <tr key={index} onClick={() => setCurrentOrder(item._id)}>
          <td>{index + 1}</td>
          <td>{convertDate(item.dateCreated)}</td>
          <td>{convertDate(item.dateCompleted)}</td>
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
          <TableActions payload={currentOrder} status={statusOfTables.completed} />
        </tr>
      ))
    )
  }

  const DeclinedTemplate = (declined) => {
    if () return (
      // @ts-ignore
      declinedData.map((item, index) => (
        <tr key={index} onClick={() => setCurrentOrder(item._id)}>
          <td>{index + 1}</td>
          <td>{convertDate(item.dateCreated)}</td>
          <td>{convertDate(item.dateCancelled)}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{item.cancelledBy.fullName}</td>
          <td>{item.cancellationCause}</td>
          <TableActions payload={currentOrder} status={statusOfTables.declined} />
        </tr>
      ))
    )
  }

  // @ts-ignore
  function selectTable(status) {
    switch (status) {
      case statusOfTables.pending:
        // @ts-ignore
        setCurrentTable({ headers: headers.pending, template: PendingTemplate })
        break
      case statusOfTables.inWork:
        // @ts-ignore
        setCurrentTable({ headers: headers.inWork, template: InWorkTemplate })
        break
      case statusOfTables.completed:
        // @ts-ignore
        setCurrentTable({ headers: headers.completed, template: CompletedTemplate })
        break
      case statusOfTables.declined:
        // @ts-ignore
        setCurrentTable({ headers: headers.declined, template: DeclinedTemplate })
        break
      default:
        // @ts-ignore
        setCurrentTable({ headers: headers.pending, template: PendingTemplate })
        break
    }
  }

interface IProps {
  status: string
}

export const TableComponent: React.FC<IProps> = ({ status }) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { pending, inWork, completed, declined, loading, error } = useSelector(state => state.mainTables)
  const dataIsReady = pending && inWork && complete && declined
  const [currentTable, setCurrentTable] = useState({ headers: {}, template: null })
  const [currentOrder, setCurrentOrder] = useState(null)

  useEffect(() => {
    const request = {
      status: "1", ...emptyPeriod
    }
    dispatch(fetchMainTableByStatus(request))
  }, [dispatch, emptyPeriod])

  useEffect(() => {
    sselectTable(status)
  }, [status])

  if (loading) return <Loader />
  if (error) return <ErrorWindow message={error} />
  if (dataIsReady) return (
    <table>
      <thead>
        <tr>
          {/* @ts-ignore */}
          {currentTable.headers[status].map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentTable.template}
      </tbody>
    </table>
  )
  return null
}