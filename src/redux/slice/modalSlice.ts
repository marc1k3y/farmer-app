import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../../http"

interface ICreateAR {
  price: number
  quantity: number
  typeID: string
  currencyID: string
  locationID: string
  description: string
}

export const createAccountRequest = createAsyncThunk(
  "createAccountRequest",
  async (requestBody: ICreateAR) => {
    const {data} = await $authHost.post("accountRequests/create", requestBody)
    return data
  }
)

const ModalSlice: Slice = createSlice({
  name: "modalSlice",
  initialState: {
    createdRequestId: null,
    loading: false,
    error: null,
    createdRequestId: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // create account request
    builder.addCase(createAccountRequest.fulfilled, (state, {payload}) => {
      state.createdRequestId = payload
      state.loading = false
    })
    builder.addCase(createAccountRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createAccountRequest.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default ModalSlice.reducer