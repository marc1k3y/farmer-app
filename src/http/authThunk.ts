import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost, $host } from "."

interface IApiArgs {
  email: string
  password: string
}

export const tryAuth: any = createAsyncThunk(
  "auth/login",
  async (authData: IApiArgs) => {
    const { data } = await $host.post("auth/login", authData)
    localStorage.setItem("token", data.token)
    localStorage.setItem("username", data.username)
    localStorage.setItem("roleId", data.roleID)
    localStorage.setItem("teamId", data.teamID)
    localStorage.setItem("userId", data.userID)
    return data
  }
)

export const checkAuth: any = createAsyncThunk(
  "auth/check",
  async () => {
    const { data } = await $authHost.get("auth/check")
    return data
  }
)