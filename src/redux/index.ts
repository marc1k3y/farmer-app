import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainTablesSlice from "./mainTablesSlice"

const rootReducer = combineReducers({
  mainTables: mainTablesSlice
})

export const store = configureStore({
  reducer: rootReducer
})