export const AccountTypeDropdown: React.FC = ({ options }: object[] | any) => {
  if (options) return (
    <select>
      {options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  )
  return null
} 