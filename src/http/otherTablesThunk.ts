import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

export const fetchTeamNumber: any = createAsyncThunk(
  "get/farmerTeams",
  async () => {
    const { data } = await $authHost.get("farmerAccess/get/teams")
    return data
  }
)