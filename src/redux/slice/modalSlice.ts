import { createSlice, Slice } from "@reduxjs/toolkit"
import { createAccountRequest, fetchOrderInfoById } from "../../http/accountRequestThunk"

interface IState {
  price: number
  quantity: number
  total: number
  valid?: number // ??
  team?: number // ??
  description: string
  createdRequestId: string | null
  loading: boolean
  error?: string
}

const initialState: IState = {
  team: null,
  valid: null,
  price: null,
  quantity: null,
  total: null,
  description: null,
  createdRequestId: null,
  loading: false,
  error: null
}

const ModalSlice: Slice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setPrice(state, { payload }) {
      state.price = payload
    },
    setQuantity(state, { payload }) {
      state.quantity = payload
    },
    setDescription(state, { payload }) {
      state.description = payload
    }
  },
  extraReducers: (builder) => {
    // create account request
    builder.addCase(createAccountRequest.fulfilled, (state, { payload }) => {
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
    // fetch order info by id
    builder.addCase(fetchOrderInfoById.fulfilled, (state, { payload }) => {
      state.price = payload.price // ??
      state.quantity = payload.quantity
      state.valid = payload.valid // ??
      state.team = payload.team.id // ??
      state.description = payload.description
      state.loading = false
    })
    builder.addCase(fetchOrderInfoById.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchOrderInfoById.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default ModalSlice.reducer
export const { setPrice, setQuantity, setDescription } = ModalSlice.actions