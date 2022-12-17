export const LocationDropdown: React.FC<any> = ({ options, currents, setCurrents }) => {
  if (options) return (
    <select
      defaultValue={currents.location}
      onChange={(e) => setCurrents({ ...currents, location: e.target.value })}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
        {option.iso}
      </option>
      ))}
    </select>
  )
  return null
} 