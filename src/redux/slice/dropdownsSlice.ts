import { createSlice, Slice } from "@reduxjs/toolkit"
import { fetchAccountTypes, fetchCurrencies, fetchLocations } from "../../http/dropdownThunk"

type dropdownResponse = { _id: string, name: string, iso?: string }
type dropdownState = { currentId: string, all: dropdownResponse[] }

interface IState {
  accountTypes: dropdownState
  currencies: dropdownState
  locations: dropdownState
  loading: boolean
  error?: string
}

const initialState: IState = {
  accountTypes: {
    currentId: null,
    all: null
  },
  currencies: {
    currentId: null,
    all: null
  },
  locations: {
    currentId: null,
    all: null
  },
  loading: false,
  error: null
}

const DropdownSlice: Slice = createSlice({
  name: "dropdowns",
  initialState,
  reducers: {
    setCurrentTypeId(state, { payload }) {
      state.accountTypes.currentId = payload
    },
    setCurrentCurrencyId(state, { payload }) {
      state.currencies.currentId = payload
    },
    setCurrentLocationId(state, { payload }) {
      state.locations.currentId = payload
    }
  },
  extraReducers: (builder) => {
    //accountType
    builder.addCase(fetchAccountTypes.fulfilled, (state, { payload }) => {
      state.accountTypes.all = payload
      state.accountTypes.currentId = payload[0]["_id"]
      state.loading = false
    })
    builder.addCase(fetchAccountTypes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAccountTypes.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    //currency
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      state.currencies.all = payload
      state.currencies.currentId = payload[0]["_id"]
      state.loading = false
    })
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCurrencies.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    //location
    builder.addCase(fetchLocations.fulfilled, (state, { payload }) => {
      state.locations.all = payload
      state.locations.currentId = payload[0]["_id"]
      state.loading = false
    })
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchLocations.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default DropdownSlice.reducer
export const { setCurrentTypeId, setCurrentCurrencyId, setCurrentLocationId } = DropdownSlice.actions