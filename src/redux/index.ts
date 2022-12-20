import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import dropdownsSlice from "./slice/dropdownsSlice"
import mainTableSlice from "./slice/mainTableSlice"
import modalSlice from "./slice/modalSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  mainTables: mainTableSlice,
  dropdowns: dropdownsSlice,
  modal: modalSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})