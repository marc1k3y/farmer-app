import css from "./style.module.css"
import { OutTableActions } from "../../components/outTableActions"
import { MainTables } from "../../components/mainTables/MainTables"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export const MainPage: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate()
  return (
    // @ts-ignore
    <div className={css.wrapper} ref={parent}>
      <OutTableActions />
      <MainTables enableAnimations={enableAnimations} />
    </div>
  )
}