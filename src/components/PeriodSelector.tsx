import "react-day-picker/dist/style.css"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setPeriod } from "../redux/slice/mainTablesSlice"
import emptyCalendarSVG from "../assets/calendar.svg"

export const PeriodSelector = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const monthDay = today.toLocaleDateString().split("/")[1]
  const { period } = useAppSelector(state => state.mainTables)

  function setPeriodHandler({ from, to }) {
    const payload = { from, to }
    dispatch(setPeriod(payload))
  }

  // useEffect(() => {
  //   setPeriodHandler({ from: today, to: today })
  // }, [])

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        backgroundColor: isOpen ? "gray" : "transparent", border: "none", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"
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
          style={{ filter: isOpen ? `invert(48%) brightness(1000%) contrast(100%)` : "none" }} />
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