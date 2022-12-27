import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import dropdownsSlice from "./slice/dropdownsSlice"
import mainTableSlice from "./slice/mainTablesSlice"
import modalSlice from "./slice/modalSlice"
import otherTableSlice from "./slice/otherTableSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  mainTables: mainTableSlice,
  dropdowns: dropdownsSlice,
  modal: modalSlice,
  otherTable: otherTableSlice
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch