import css from "./style.module.css"
import { TableComponent } from "../../components/mainTables/table"
import { statusOfTables } from "../../constants"
import { OutTableActions } from "../../components/outTableActions"

export const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <OutTableActions />
      <TableComponent status={statusOfTables.pending} />
    </div>
  )
}