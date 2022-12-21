import { createSlice, Slice } from "@reduxjs/toolkit"
import { createAccountRequest } from "../../http/accountRequestActionThunk"

interface IState {
  createdRequestId: string | null
  loading: boolean
  error?: string | null
}

const initialState: IState = {
  createdRequestId: null,
  loading: false,
  error: null
}

const ModalSlice: Slice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {},
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