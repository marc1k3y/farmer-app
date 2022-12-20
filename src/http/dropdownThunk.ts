import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

export const fetchAccountTypes: any = createAsyncThunk(
  "accountType/get/all",
  async () => {
    const { data } = await $authHost.get("accountTypes/get/all")
    return data
  }
)

export const fetchLocations: any = createAsyncThunk(
  "location/get/all",
  async () => {
    const { data } = await $authHost.get("locations/get/all")
    return data
  }
)

export const fetchCurrencies: any = createAsyncThunk(
  "currency/get/all",
  async () => {
    const { data } = await $authHost.get("currency/get/all")
    return data
  }
)