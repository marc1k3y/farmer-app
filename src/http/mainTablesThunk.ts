import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."
import { setTableStatus } from "../redux/slice/mainTablesSlice"

interface IApiArgs {
  status: "0" | "1" | "2" | "3"
  startDate: string
  endDate: string
}

function setTableName(status) {
  switch (status) {
    case "0":
      return "pending"
    case "1":
      return "inWork"
    case "2":
      return "completed"
    case "3":
      return "declined"
    default:
      break
  }
}

export const fetchTableByStatus: any = createAsyncThunk(
  "tableData/get/tableByStatus",
  async ({ status, startDate, endDate }: IApiArgs, { dispatch }) => {
    const tableStatus = setTableName(status)
    dispatch(setTableStatus(tableStatus))
    const { data } = await $authHost.get("tableData/get", {
      params: {
        status, startDate, endDate
      }
    })
    return data
  }
)