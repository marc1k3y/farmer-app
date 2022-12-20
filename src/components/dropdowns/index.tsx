import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrencyDropdown } from "./Currency"
import { LocationDropdown } from "./Location"
import { AccountTypeDropdown } from "./AccountType"
import { fetchAccountTypes, fetchCurrencies, fetchLocations } from "../../http/dropdownThunk"
import { setCurrentCurrencyId, setCurrentLocationId, setCurrentTypeId } from "../../redux/slice/dropdownsSlice"
import { ErrorWindow } from "../UI/Error"
import { Loader } from "../UI/Loader"

export const Dropdowns = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { accountTypes, currencies, locations, loading, error } = useSelector(state => state.dropdowns)

  console.log("Dropdowns:", accountTypes, currencies, locations, loading, error);

  function setTypeID(value) {
    // @ts-ignore
    dispatch(setCurrentTypeId(value))
  }

  function setCurrencyID(value) {
    // @ts-ignore
    dispatch(setCurrentCurrencyId(value))
  }

  function setLocationID(value) {
    // @ts-ignore
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