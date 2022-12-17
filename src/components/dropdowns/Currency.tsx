export const CurrencyDropdown: React.FC<any> = ({ options, currents, setCurrents }) => {
  if (options) return (
    // @ts-ignore
    <select
      defaultValue={currents.currency}
      onChange={(e) => setCurrents({ ...currents, currency: e.target.value })}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  )
  return null
} 