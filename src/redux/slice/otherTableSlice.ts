import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../http"

export const fetchTeamNumber = createAsyncThunk(
  "get/farmerTeams",
  async () => {
    const res = await $authHost.get("farmerAccess/get/teams")
    return res.data
  }
)

const OtherTableSlice: Slice = createSlice({
  name: "otherTableSlice",
  initialState: {
    buyerData: [],
    farmerData: [],
    teamLeadData: [],
    teamNumberData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // team manage list
    builder.addCase(fetchTeamNumber.fulfilled, (state, { payload }) => {
      state.teamNumberData = payload
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