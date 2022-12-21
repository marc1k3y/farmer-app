import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

interface IApiArgs {
  price: number
  quantity: number
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