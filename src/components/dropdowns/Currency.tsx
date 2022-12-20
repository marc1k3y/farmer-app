export const CurrencyDropdown: React.FC<any> = ({ options, current, setCurrent }) => {
  if (options) return (
    // @ts-ignore
    <select
      defaultValue={current}
      onChange={(e) => setCurrent(e.target.value)}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  )
  return null
} 