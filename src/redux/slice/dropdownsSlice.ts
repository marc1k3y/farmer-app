import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../http"

export const fetchAccountTypes: any = createAsyncThunk(
  "accountType/get/all",
  async () => {
    const res = await $authHost.get("accountTypes/get/all")
    return res.data
  }
)

export const fetchCurrencies: any = createAsyncThunk(
  "currency/get/all",
  async () => {
    const res = await $authHost.get("currency/get/all")
    return res.data
  }
)

export const fetchLocations: any = createAsyncThunk(
  "location/get/all",
  async () => {
    const res = await $authHost.get("locations/get/all")
    return res.data
  }
)

const DropdownSlice: Slice = createSlice({
  name: "dropdowns",
  initialState: {
    currencies: null,
    locations: null,
    accountTypes: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // accountType
    builder.addCase(fetchAccountTypes.fulfilled, (state, { payload }) => {
      state.accountTypes = payload
      state.loading = false
    })
    builder.addCase(fetchAccountTypes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAccountTypes.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    // currency
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      state.currencies = payload
      state.loading = false
    })
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCurrencies.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    // location
    builder.addCase(fetchLocations.fulfilled, (state, { payload }) => {
      state.locations = payload
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