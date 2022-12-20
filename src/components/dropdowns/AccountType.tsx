export const AccountTypeDropdown: React.FC<any> = ({ options, current, setCurrent }) => {
  if (options) return (
    <select
      defaultValue={current}
      onChange={(e) => setCurrent(e.target.value)}>
      {options.map((option, i) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  )
  return null
}