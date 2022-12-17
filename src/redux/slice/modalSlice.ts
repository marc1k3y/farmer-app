import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../http"

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
    const res = await $authHost.post("accountRequests/create", requestBody)
    return res
  }
)

const ModalSlice: Slice = createSlice({
  name: "modalSlice",
  initialState: {
    loading: false,
    error: null,
    createdRequestId: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // create account request
    builder.addCase(createAccountRequest.fulfilled, (state) => {
      // need set response to createdRequestId
      state.loading = false
    })
    builder.addCase(createAccountRequest.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createAccountRequest.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export default ModalSlice.reducer
export const { setCreatedRequestId } = ModalSlice.actions