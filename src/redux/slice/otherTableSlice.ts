import { createSlice, Slice } from "@reduxjs/toolkit"
import { fetchTeamNumber } from "../../http/otherTablesThunk"

interface roleTable {
  price: number
  quantity: number
  total: number
  uid: {
    _id: number
    fullName: string
    role: number
  }
  valid: number
}

interface IState {
  buyers: roleTable[] | null
  farmers: roleTable[] | null
  teamLeads: roleTable[] | null
  teamNumbers: number[] | null
  loading: boolean
  error?: string
}

const initialState: IState = {
  buyers: null,
  farmers: null,
  teamLeads: null,
  teamNumbers: null,
  loading: false,
  error: null
}

const OtherTableSlice: Slice = createSlice({
  name: "otherTableSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // team manage list
    builder.addCase(fetchTeamNumber.fulfilled, (state, { payload }) => {
      state.teamNumbers = payload
      state.loading = false
    })
    builder.addCase(fetchTeamNumber.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeamNumber.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export default OtherTableSlice.reducer