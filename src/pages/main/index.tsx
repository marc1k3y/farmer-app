import css from "./style.module.css"
import { OutTableActions } from "../../components/outTableActions"
import { MainTables } from "../../components/mainTables/MainTables"

export const MainPage: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <OutTableActions />
      <MainTables />
    </div>
  )
}