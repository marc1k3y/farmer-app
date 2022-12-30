import { createSlice, Slice } from "@reduxjs/toolkit"
import { Apps } from "../../constants"

const initialState = {
  app: Apps[0]
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