import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dropdownsSlice from "./slice/dropdownsSlice"
import mainTableSlice from "./slice/mainTableSlice"
import modalSlice from "./slice/modalSlice"

const rootReducer = combineReducers({
  mainTables: mainTableSlice,
  modal: modalSlice,
  dropdowns: dropdownsSlice
})

export const store = configureStore({
  reducer: rootReducer
})