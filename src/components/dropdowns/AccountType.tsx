export const AccountTypeDropdown: React.FC<any> = ({ options, currents, setCurrents }) => {
  if (options) return (
    <select
      defaultValue={currents.accountType}
      onChange={(e) => setCurrents({ ...currents, accountType: e.target.value })}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  )
  return null
}