import { createSlice, Slice } from "@reduxjs/toolkit"
import { Apps } from "../../constants"

const initialState = {
  app: Apps.farmer
}

const AppSlice: Slice = createSlice({
  name: "globalApp",
  initialState,
  reducers: {
    setApp(state, { payload }) {
      state.app = payload
    }
  }
})

export default AppSlice.reducer
export const { setApp } = AppSlice.actions