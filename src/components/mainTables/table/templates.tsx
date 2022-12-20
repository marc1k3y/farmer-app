import { roleId, statusOfTables, workerNameInTableByRole } from "../../../constants"
import { TableActions } from "../actions"
import { formatUnixDate, setRoleName } from "./tools"

const headers = {
  "0": ["№", "Дата", "Количество", "Тип аккаунта", "Локация", workerNameInTableByRole[roleId], "Описание", "Команда", "Действия"],
  "1": ["№", "Дата", "Количество", "Тип аккаунта", "Локация", workerNameInTableByRole[roleId], "Описание", "Команда", "Действия"],
  "2": ["№", "Дата создания", "Дата закрытия", "Количество", "Валидных", "Цена", "Итого", "Валюта", "Тип аккаунта", "Локация", workerNameInTableByRole[roleId], "Описание", "Команда", "Действия"],
  "3": ["№", "Дата создания", "Дата отмены", "Тип аккаунта", "Локация", "Отменил", "Причина отмены", "Действия"],
}

const PendingTemplate = ({ data, currentOrder, setCurrentOrder }) => {
  if (data) return (
    data.map((item, index) => (
      <tr key={index} onClick={() => setCurrentOrder(item._id)}>
        <td>{index + 1}</td>
        <td>{formatUnixDate(item.dateCreated)}</td>
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

const InWorkTemplate = ({ data, currentOrder, setCurrentOrder }) => {
  if (data) return (
    data.map((item, index) => (
      <tr key={index} onClick={() => setCurrentOrder(item._id)}>
        <td>{index + 1}</td>
        <td>{formatUnixDate(item.dateCreated)}</td>
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

const CompletedTemplate = ({ data, currentOrder, setCurrentOrder }) => {
  if (data) return (
    data.map((item, index) => (
      <tr key={index} onClick={() => setCurrentOrder(item._id)}>
        <td>{index + 1}</td>
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
        <TableActions payload={currentOrder} status={statusOfTables.completed} />
      </tr>
    ))
  )
}

const DeclinedTemplate = ({ data, currentOrder, setCurrentOrder }) => {
  if (data) return (
    data.map((item, index) => (
      <tr key={index} onClick={() => setCurrentOrder(item._id)}>
        <td>{index + 1}</td>
        <td>{formatUnixDate(item.dateCreated)}</td>
        <td>{formatUnixDate(item.dateCancelled)}</td>
        <td>{item.type.name}</td>
        <td>{item.location.iso}</td>
        <td>{item.cancelledBy.fullName}</td>
        <td>{item.cancellationCause}</td>
        <TableActions payload={currentOrder} status={statusOfTables.declined} />
      </tr>
    ))
  )
}

function selectTable(status: string, data?: [], currentOrder?: string, setCurrentOrder?: void): JSX.Element {
  switch (status) {
    case statusOfTables.pending:
      return <PendingTemplate data={data} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
    case statusOfTables.inWork:
      return <InWorkTemplate data={data} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
    case statusOfTables.completed:
      return <CompletedTemplate data={data} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
    case statusOfTables.declined:
      return <DeclinedTemplate data={data} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
    default:
      return <PendingTemplate data={data} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
  }
}

export { headers, selectTable }