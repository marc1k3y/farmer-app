import "react-day-picker/dist/style.css"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setPeriod } from "../redux/slice/mainTablesSlice"
import emptyCalendarSVG from "../assets/calendar.svg"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export const PeriodSelector = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const monthDay = today.toLocaleDateString().split("/")[1]
  const { period } = useAppSelector(state => state.mainTables)
  const [parent] = useAutoAnimate()

  function setPeriodHandler({ from, to }) {
    const payload = { from, to }
    dispatch(setPeriod(payload))
  }

  return (
    // @ts-ignore
    <div style={{ position: "relative" }} ref={parent}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        border: "none", backgroundColor: "transparent"
      }}>
        <div style={{
          color: isOpen ? "white" : "black",
          position: "absolute",
          top: 16, left: 0, right: 0, fontWeight: "bold"
        }}>{monthDay}</div>
        <img
          src={emptyCalendarSVG}
          alt="empty-calendar-svg"
          width={40} height={40}
          style={{ filter: isOpen ? `invert(50%) brightness(1000%) contrast(100%)` : "none" }} />
      </button>
      {isOpen
        && <DayPicker
          mode="range"
          defaultMonth={today}
          selected={period}
          onSelect={setPeriodHandler}
        />}
    </div>
  )
}