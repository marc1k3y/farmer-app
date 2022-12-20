export const LocationDropdown: React.FC<any> = ({ options, current, setCurrent }) => {
  if (options) return (
    <select
      defaultValue={current}
      onChange={(e) => setCurrent(e.target.value)}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
        {option.iso}
      </option>
      ))}
    </select>
  )
  return null
} 