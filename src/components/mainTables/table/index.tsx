import { useState } from "react"
import { roleId, statusOfTables } from "../../../constants"
import { roles } from "../../roles"
import { TableActions } from "../actions"
import { converDate, setName } from "./tools"

// @ts-ignore
export const TableComponent = ({ type }) => {
  // @ts-ignore
  const { pendingData, inWorkData, completedData, declinedData } = null // temp
  const [current, setCurrent] = useState({ headers: null, template: null })

  const headers = {
    // @ts-ignore
    pending: ["№", "Дата", "Количество", "Тип аккаунта", "Локация", roles[roleId].roleName, "Описание", "Команда", "Действия"],
    // @ts-ignore
    inWork: ["№", "Дата", "Количество", "Тип аккаунта", "Локация", roles[roleId].roleName, "Описание", "Команда", "Действия"],
    // @ts-ignore
    completed: ["№", "Дата создания", "Дата закрытия", "Количество", "Валидных", "Цена", "Итого", "Валюта", "Тип аккаунта", "Локация", roles[roleId].roleName, "Описание", "Команда", "Действия"],
    declined: ["№", "Дата создания", "Дата отмены", "Тип аккаунта", "Локация", "Отменил", "Причина отмены", "Действия"],
  }

  // @ts-ignore
  const PendingTemplate = () => {
    if (pendingData) return (
      // @ts-ignore
      pendingData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{converDate(item.dateCreated)}</td>
          <td>{item.quantity}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{setName(item)}</td>
          <td>{item.description}</td>
          <td>{item.team.id}</td>
        </tr>
      ))
    )
  }

  // @ts-ignore
  const InWorkTemplate = () => {
    if (inWorkData) return (
      // @ts-ignore
      inWorkData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{converDate(item.dateCreated)}</td>
          <td>{item.quantity}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{setName(item)}</td>
          <td>{item.description}</td>
          <td>{item.team.id}</td>
        </tr>
      ))
    )
  }

  // @ts-ignore
  const CompletedTemplate = () => {
    if (completedData) return (
      // @ts-ignore
      completedData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{converDate(item.dateCreated)}</td>
          <td>{converDate(item.dateCompleted)}</td>
          <td>{item.quantity}</td>
          <td>{item.valid}</td>
          <td>{item.price}</td>
          <td>{item.total}</td>
          <td>{item.currency.iso}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{setName(item)}</td>
          <td>{item.description}</td>
          <td>{item.team.id}</td>
        </tr>
      ))
    )
  }

  // @ts-ignore
  const DeclinedTemplate = () => {
    if (declinedData) return (
      // @ts-ignore
      declinedData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{converDate(item.dateCreated)}</td>
          <td>{converDate(item.dateCancelled)}</td>
          <td>{item.type.name}</td>
          <td>{item.location.iso}</td>
          <td>{item.cancelledBy.fullName}</td>
          <td>{item.cancellationCause}</td>
        </tr>
      ))
    )
  }

  switch (type) {
    case statusOfTables.pending:
      // @ts-ignore
      setCurrent({ headers: headers.pending, template: PendingTemplate })
      break
    case statusOfTables.inWork:
      // @ts-ignore
      setCurrent({ headers: headers.inWork, template: InWorkTemplate })
      break
    case statusOfTables.completed:
      // @ts-ignore
      setCurrent({ headers: headers.completed, template: CompletedTemplate })
      break
    case statusOfTables.declined:
      // @ts-ignore
      setCurrent({ headers: headers.declined, template: DeclinedTemplate })
      break
    default:
      // @ts-ignore
      setCurrent({ headers: headers.pending, template: PendingTemplate })
      break
  }

  if (current.template) return (
    <table>
      <thead>
        <tr>
          {/* @ts-ignore */}
          {current.headers.map(item => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {current.template}
      </tbody>
    </table>
  )
}