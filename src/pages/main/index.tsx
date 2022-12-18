import css from "./style.module.css"
import { TableComponent } from "../../components/mainTables/table"

export const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <TableComponent status={1} />
    </div>
  )
}