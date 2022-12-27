import { createSlice, Slice } from "@reduxjs/toolkit"
import { checkAuth, tryAuth } from "../../http/authThunk"

interface IState {
  isAuth: boolean
  loading: boolean
  error?: string
}

const initialState: IState = {
  isAuth: false,
  loading: false,
  error: null
}

const AuthSlice: Slice = createSlice({
  name: "auth",
  initialState,
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
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
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