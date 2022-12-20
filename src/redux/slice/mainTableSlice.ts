import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { statusOfTables } from "../../constants";
import { $authHost } from "../../http"

interface IMainTableAPI {
  status: "0" | "1" | "2" | "3"
  startDate: string
  endDate: string
}

export const fetchMainTableByStatus: any = createAsyncThunk(
  "tableData/get/tableByStatus",
  async ({ status, startDate, endDate }: IMainTableAPI) => {
    const { data } = await $authHost.get("tableData/get", {
      params: {
        status, startDate, endDate
      }
    })
    return data
  }
)

const MainTableSlice: Slice = createSlice({
  name: "mainTables",
  initialState: {
    pending: null,
    inWork: null,
    completed: null,
    declined: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMainTableByStatus.fulfilled, (state, { payload }) => {
      const status = payload?.status
      state[statusOfTables[status]] = payload
      state.loading = false
    })
    builder.addCase(fetchMainTableByStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchMainTableByStatus.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default MainTableSlice.reducer