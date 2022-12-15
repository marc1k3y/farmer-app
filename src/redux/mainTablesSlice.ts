import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "./http"

export const fetchTables = createAsyncThunk(
  "tableData/get",
  // @ts-ignore
  async (status, startDate, endDate) => {
    const res = await $authHost.get("tableData/get", {
      params: {
        status, startDate, endDate
      }
    })
    return res.data
  }
)

const MainTablesSlice: Slice = createSlice({
  name: "mainTables",
  initialState: {
    tableData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTables.fulfilled, (state, { payload }) => {
      // @ts-ignore
      state.tableData = payload
      state.loading = false
    })
    builder.addCase(fetchTables.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTables.rejected, (state, { error }) => {
      // @ts-ignore
      state.error = error.message
    })
  }
})

export default MainTablesSlice.reducer