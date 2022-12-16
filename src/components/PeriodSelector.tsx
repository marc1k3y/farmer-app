import "react-day-picker/dist/style.css"
import { useState } from "react"
import { addDays } from "date-fns"
import { DateRange, DayPicker } from "react-day-picker"

export const PeriodSelector = () => {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const defaultSelected: DateRange = {
    from: addDays(today, -5),
    to: today
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  return (
    <DayPicker
      mode="range"
      defaultMonth={today}
      selected={range}
      onSelect={setRange}
    />
  )
}