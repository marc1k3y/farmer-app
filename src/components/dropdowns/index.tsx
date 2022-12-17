import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrencyDropdown } from "./Currency"
import { LocationDropdown } from "./Location"
import { AccountTypeDropdown } from "./AccountType"
import { fetchAccountTypes, fetchCurrencies, fetchLocations } from "../../redux/slice/dropdownsSlice"

export const Dropdowns = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { currencies, locations, accountTypes, loading, error } = useSelector(state => state.dropdowns)
  const [currents, setCurrents] = useState({
    currency: null,
    location: null,
    accountType: null
  })

  useEffect(() => {
    dispatch(fetchCurrencies())
    dispatch(fetchLocations())
    dispatch(fetchAccountTypes())
  }, [dispatch])

  useEffect(() => {
    function setDefaultCurrents() {
      if (!currents.currency && currencies) {
        setCurrents((prev) => ({ ...prev, currency: currencies[0]["_id"] }))
      }
      if (!currents.location && locations) {
        setCurrents((prev) => ({ ...prev, location: locations[0]["_id"] }))
      }
      if (!currents.accountType && accountTypes) {
        setCurrents((prev) => ({ ...prev, accountType: accountTypes[0]["_id"] }))
      }
    }
    setDefaultCurrents()
  }, [currencies, locations, accountTypes, currents])

  if (error) return <h1>Error window with message</h1>
  if (loading) return <h1>Loader</h1>
  if (currents) return (
    <div>
      <CurrencyDropdown options={currencies} currents={currents} setCurrents={setCurrents} />
      <LocationDropdown options={locations} currents={currents} setCurrents={setCurrents} />
      <AccountTypeDropdown options={accountTypes} currents={currents} setCurrents={setCurrents} />
    </div>
  )
}