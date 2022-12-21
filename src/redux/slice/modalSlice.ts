import { createSlice, Slice } from "@reduxjs/toolkit"
import { createAccountRequest } from "../../http/accountRequestActionThunk"

interface IState {
  price: number
  quantity: number
  total: number
  description: string
  createdRequestId: string | null
  loading: boolean
  error?: string | null
}

const initialState: IState = {
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
  }
})

export default ModalSlice.reducer
export const { setPrice, setQuantity, setDescription } = ModalSlice.actions