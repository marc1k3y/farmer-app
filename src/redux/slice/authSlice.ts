import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost, $host } from "../http"

export const tryAuth: any = createAsyncThunk(
  "auth/login",
  async (authData) => {
    const res = await $host.post("auth/login", authData)
    return res.data
  }
)

export const checkAuth: any = createAsyncThunk(
  "auth/check",
  async () => {
    const res = await $authHost.get("auth/check")
    return res.data
  }
)

const AuthSlice: Slice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(tryAuth.fulfilled, (state, { payload }) => {
      state.isAuth = true
      localStorage.setItem("token", payload.token)
      localStorage.setItem("username", payload.username)
      localStorage.setItem("roleId", payload.roleID)
      localStorage.setItem("teamId", payload.teamID)
      localStorage.setItem("userId", payload.userID)
      state.loading = false
    })
    builder.addCase(tryAuth.pending, (state) => {
      state.loading = true
    })
    builder.addCase(tryAuth.rejected, (state, { error }) => {
      state.error = error.message
      state.isAuth = false
      state.loading = false
    })
    // check auth
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.isAuth = true
      state.loading = false
    })
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true
    })
    builder.addCase(checkAuth.rejected, (state, { error }) => {
      state.error = error.message
      state.isAuth = false
      state.loading = false
    })
  }
})

export default AuthSlice.reducer