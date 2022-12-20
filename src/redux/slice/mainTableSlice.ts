import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { useState } from "react"
import { statusOfTables } from "../../constants";
import { $authHost } from "../../http"

let currentStatus = statusOfTables.pending

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

interface IMainTableAPI {
  status: "0" | "1" | "2" | "3"
  startDate: string
  endDate: string
}

export const fetchMainTableByStatus: any = createAsyncThunk(
  "tableData/get/tableByStatus",
  async ({ status, startDate, endDate }: IMainTableAPI) => {
    console.log(status, startDate, endDate);
    
    currentStatus = status
    const res = await $authHost.get("tableData/get", {
      params: {
        status, startDate, endDate
      }
    })
    return res
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
    pendingData: null,
    inWorkData: null,
    completeData: null,
    declinedData: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMainTableByStatus.fulfilled, (state, { payload }) => {
      const tableData = getKeyByValue(statusOfTables, currentStatus)
      state[tableData] = payload
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