import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainTableSlice from "./slice/mainTableSlice"

const rootReducer = combineReducers({
  mainTables: mainTableSlice
})

export const store = configureStore({
  reducer: rootReducer
})