import { createSlice, Slice } from "@reduxjs/toolkit"
import { fetchBuyerListTable, fetchFarmerListTable, fetchFarmersForTeamManage, fetchTeamleadListTable, fetchTeamNumber } from "../../http/otherTablesThunk"

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
  teamleadId: string
  buyers: roleTable[] | null
  farmers: roleTable[] | null
  teamLeads: roleTable[] | null
  teamNumbers: number[] | null
  farmersForTeamManage: [] | null
  loading: boolean
  error?: string
}

const initialState: IState = {
  teamleadId: null,
  buyers: null,
  farmers: null,
  teamLeads: null,
  teamNumbers: null,
  farmersForTeamManage: null,
  loading: false,
  error: null,
}

const OtherTableSlice: Slice = createSlice({
  name: "otherTableSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // buyer list
    builder.addCase(fetchBuyerListTable.fulfilled, (state, { payload }) => {
      state.buyers = payload
      state.loading = false
    })
    builder.addCase(fetchBuyerListTable.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBuyerListTable.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    // farmer list
    builder.addCase(fetchFarmerListTable.fulfilled, (state, { payload }) => {
      state.farmers = payload
      state.loading = false
    })
    builder.addCase(fetchFarmerListTable.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchFarmerListTable.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
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
      state.loading = false
    })
    // fetch farmers for team manage table
    builder.addCase(fetchFarmersForTeamManage.fulfilled, (state, { payload }) => {
      state.farmersForTeamManage = payload
      state.loading = false
    })
    builder.addCase(fetchFarmersForTeamManage.pending, (state) => {
      state.loading = false
    })
    builder.addCase(fetchFarmersForTeamManage.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    // fetch team leads list
    builder.addCase(fetchTeamleadListTable.fulfilled, (state, { payload }) => {
      state.teamLeads = payload
      state.loading = false
    })
    builder.addCase(fetchTeamleadListTable.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeamleadListTable.rejected, (state, { error }) => {
      state.error = error
      state.loading = false
    })
  }
})

export default OtherTableSlice.reducer