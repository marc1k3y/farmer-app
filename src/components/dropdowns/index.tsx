import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { CurrencyDropdown } from "./Currency"
import { LocationDropdown } from "./Location"
import { AccountTypeDropdown } from "./AccountType"
import { fetchAccountTypes, fetchCurrencies, fetchLocations } from "../../http/dropdownThunk"
import { setCurrentCurrencyId, setCurrentLocationId, setCurrentTypeId } from "../../redux/slice/dropdownsSlice"
import { ErrorWindow } from "../UI/Error"
import { Loader } from "../UI/Loader"

export const Dropdowns = () => {
  const dispatch = useAppDispatch()
  const { accountTypes, currencies, locations, loading, error } = useAppSelector(state => state.dropdowns)

  function setTypeID(value: string) {
    dispatch(setCurrentTypeId(value))
  }

  function setCurrencyID(value: string) {
    dispatch(setCurrentCurrencyId(value))
  }

  function setLocationID(value: string) {
    dispatch(setCurrentLocationId(value))
  }

  useEffect(() => {
    dispatch(fetchCurrencies())
    dispatch(fetchLocations())
    dispatch(fetchAccountTypes())
  }, [dispatch])

  if (error) return <ErrorWindow message={error} />
  if (loading) return <Loader />
  return (
    <div>
      <AccountTypeDropdown options={accountTypes.all} current={accountTypes.currentId} setCurrent={setTypeID} />
      <CurrencyDropdown options={currencies.all} current={currencies.currentId} setCurrent={setCurrencyID} />
      <LocationDropdown options={locations.all} current={locations.currentId} setCurrent={setLocationID} />
    </div>
  )
}