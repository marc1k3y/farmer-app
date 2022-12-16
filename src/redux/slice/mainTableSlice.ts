import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../http"

interface IMainTableAPI {
  status: number
  startDate: string
  endDate: string
}

export const fetchPending = createAsyncThunk(
  "tableData/get/pending",
  async ({ startDate, endDate }: IMainTableAPI) => {
    const res = await $authHost.get("tableData/get", {
      params: {
        status: 0, startDate, endDate
      }
    })
    return res.data
  }
)

export const fetchInWork = createAsyncThunk(
  "tableData/get/inWork",
  async ({ startDate, endDate }: IMainTableAPI) => {
    const res = await $authHost.get("tableData/get", {
      params: {
        status: 1, startDate, endDate
      }
    })
    return res.data
  }
)

export const fetchComplete = createAsyncThunk(
  "tableData/get/complete",
  async ({ startDate, endDate }: IMainTableAPI) => {
    const res = await $authHost.get("tableData/get", {
      params: {
        status: 2, startDate, endDate
      }
    })
    return res.data
  }
)

export const fetchDeclined = createAsyncThunk(
  "tableData/get/declined",
  async ({ startDate, endDate }: IMainTableAPI) => {
    const res = await $authHost.get("tableData/get", {
      params: {
        status: 3, startDate, endDate
      }
    })
    return res.data
  }
)

const MainTableSlice: Slice = createSlice({
  name: "mainTables",
  initialState: {
    pendingData: [],
    inWorkData: [],
    completeData: [],
    declinedData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchPending.fulfilled, (state, { payload }) => {
      state.pendingData = payload
      state.loading = false
    })
    builder.addCase(fetchPending.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPending.rejected, (state, { error }) => {
      state.error = error.message
    })
    // inWork
    builder.addCase(fetchInWork.fulfilled, (state, { payload }) => {
      state.inWorkData = payload
      state.loading = false
    })
    builder.addCase(fetchInWork.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchInWork.rejected, (state, { error }) => {
      state.error = error.message
    })
    // complete
    builder.addCase(fetchComplete.fulfilled, (state, { payload }) => {
      state.completeData = payload
      state.loading = false
    })
    builder.addCase(fetchComplete.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchComplete.rejected, (state, { error }) => {
      state.error = error.message
    })
    // declined
    builder.addCase(fetchDeclined.fulfilled, (state, { payload }) => {
      state.declinedData = payload
      state.loading = false
    })
    builder.addCase(fetchDeclined.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchDeclined.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export default MainTableSlice.reducer