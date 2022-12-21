import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

interface IApiArgs {
  requestID?: string
  price: number
  quantity: number
  valid?: number // ??
  team?: number // ??
  typeID: string
  currencyID: string
  locationID: string
  description: string
}

export const createAccountRequest: any = createAsyncThunk(
  "createAccountRequest",
  async (requestBody: IApiArgs) => {
    const { data } = await $authHost.post("accountRequests/create", requestBody)
    return data
  }
)

export const completeAccountRequest: any = createAsyncThunk(
  "completeAccountRequest",
  async (requestBody: IApiArgs) => {
    const { data } = await $authHost.put("accountRequests/complete", requestBody)
    return data
  }
)

export const updateAccountRequest: any = createAsyncThunk(
  "updateAccountRequest",
  async (requestBody: IApiArgs) => {
    const { data } = await $authHost.put("accountRequests/update", requestBody)
    return data
  }
)

export const fetchOrderInfoById: any = createAsyncThunk(
  "fetchOrderInfoById",
  async (requestID: string) => {
    const { data } = await $authHost.get("accountRequests/get", {
      params: { requestID }
    })
    return data
  }
)