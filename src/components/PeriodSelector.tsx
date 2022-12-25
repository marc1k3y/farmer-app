import "react-day-picker/dist/style.css"
import React, { useEffect, useState } from "react"
import { addDays } from "date-fns"
import { DateRange, DayPicker } from "react-day-picker"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setPeriod } from "../redux/slice/mainTablesSlice"
import emptyCalendarSVG from "../assets/calendar.svg"

export const PeriodSelector = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const monthDay = today.toLocaleDateString().split("/")[1]
  const defaultSelected: DateRange = {
    from: addDays(today, -5),
    to: today
  }
  const { period } = useAppSelector(state => state.mainTables)

  function setPeriodHandler(startDate, endDate) {
    const payload = { startDate, endDate }
    dispatch(setPeriod(payload))
  }

  useEffect(() => {
    setPeriodHandler(defaultSelected.from, defaultSelected.to)
  }, [])
  // const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  // console.log(period);

  return (
    <React.Fragment>
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: "relative", backgroundColor: isOpen ? "gray" : "transparent", border: "none", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        <div style={{ color: isOpen ? "white" : "black", position: "absolute", top: 16, left: 0, right: 0, fontWeight: "bold" }}>{monthDay}</div>
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
          selected={defaultSelected}
          onSelect={setPeriodHandler}
        />}
    </React.Fragment>
  )
}