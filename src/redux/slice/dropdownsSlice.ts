import { createSlice, Slice } from "@reduxjs/toolkit"
import { fetchOrderInfoById } from "../../http/accountRequestThunk"
import { fetchAccountTypes, fetchCurrencies, fetchLocations } from "../../http/dropdownThunk"

interface dropdownResponse {
  _id: string
  name: string
  iso?: string
}

interface oneOfDropdown {
  currentId: string
  all: dropdownResponse[]
}

interface IState {
  accountTypes: oneOfDropdown
  currencies: oneOfDropdown
  locations: oneOfDropdown
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
    builder.addCase(fetchOrderInfoById.fulfilled, (state, { payload }) => {
      state.accountTypes.currentId = payload.type._id
      state.locations.currentId = payload.location._id
      state.currencies.currentId = payload.currency._id
    })
    builder.addCase(fetchOrderInfoById.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchOrderInfoById.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export default DropdownSlice.reducer
export const { setCurrentTypeId, setCurrentCurrencyId, setCurrentLocationId } = DropdownSlice.actions