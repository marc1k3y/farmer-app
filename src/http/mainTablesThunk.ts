import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

interface IApiArgs {
  status: "0" | "1" | "2" | "3"
  startDate: string
  endDate: string
}

export const fetchMainTableByStatus: any = createAsyncThunk(
  "tableData/get/tableByStatus",
  async ({ status, startDate, endDate }: IApiArgs) => {
    const { data } = await $authHost.get("tableData/get", {
      params: {
        status, startDate, endDate
      }
    })
    return data
  }
)