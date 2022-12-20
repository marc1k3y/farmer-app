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

// export const fetchPending: any = createAsyncThunk(
//   "tableData/get/pending",
//   async ({ startDate, endDate }: IMainTableAPI) => {
//     const res = await $authHost.get("tableData/get", {
//       params: {
//         status: 0, startDate, endDate
//       }
//     })
//     return res.data
//   }
// )

// export const fetchInWork: any = createAsyncThunk(
//   "tableData/get/inWork",
//   async ({ startDate, endDate }: IMainTableAPI) => {
//     const res = await $authHost.get("tableData/get", {
//       params: {
//         status: 1, startDate, endDate
//       }
//     })
//     return res.data
//   }
// )

// export const fetchComplete: any = createAsyncThunk(
//   "tableData/get/complete",
//   async ({ startDate, endDate }: IMainTableAPI) => {
//     const res = await $authHost.get("tableData/get", {
//       params: {
//         status: 2, startDate, endDate
//       }
//     })
//     return res.data
//   }
// )

// export const fetchDeclined: any = createAsyncThunk(
//   "tableData/get/declined",
//   async ({ startDate, endDate }: IMainTableAPI) => {
//     const res = await $authHost.get("tableData/get", {
//       params: {
//         status: 3, startDate, endDate
//       }
//     })
//     return res.data
//   }
// )

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
      const status = payload.status
      state[statusOfTables[status]] = payload
    })
    builder.addCase(fetchMainTableByStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchMainTableByStatus.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
    // // pending
    // builder.addCase(fetchPending.fulfilled, (state, { payload }) => {
    //   state.pendingData = payload
    //   state.loading = false
    // })
    // builder.addCase(fetchPending.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchPending.rejected, (state, { error }) => {
    //   state.error = error.message
    //   state.loading = false
    // })
    // // inWork
    // builder.addCase(fetchInWork.fulfilled, (state, { payload }) => {
    //   state.inWorkData = payload
    //   state.loading = false
    // })
    // builder.addCase(fetchInWork.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchInWork.rejected, (state, { error }) => {
    //   state.error = error.message
    //   state.loading = false
    // })
    // // complete
    // builder.addCase(fetchComplete.fulfilled, (state, { payload }) => {
    //   state.completeData = payload
    //   state.loading = false
    // })
    // builder.addCase(fetchComplete.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchComplete.rejected, (state, { error }) => {
    //   state.error = error.message
    //   state.loading = false
    // })
    // // declined
    // builder.addCase(fetchDeclined.fulfilled, (state, { payload }) => {
    //   state.declinedData = payload
    //   state.loading = false
    // })
    // builder.addCase(fetchDeclined.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchDeclined.rejected, (state, { error }) => {
    //   state.error = error.message
    //   state.loading = false
    // })
  }
})

export default MainTableSlice.reducer