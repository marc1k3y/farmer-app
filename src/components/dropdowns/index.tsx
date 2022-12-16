import { AccountTypeDropdown } from "./AccountType"
import { CurrencyDropdown } from "./Currency"
import { LocationDropdown } from "./Location"

export const Dropdowns = () => {
  return (
    <div>
      <AccountTypeDropdown />
      <CurrencyDropdown />
      <LocationDropdown />
    </div>
  )
}