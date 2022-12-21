import { createSlice, Slice } from "@reduxjs/toolkit"
import { statusOfTables } from "../../constants"
import { fetchMainTableByStatus } from "../../http/mainTablesThunk"

interface tableBody {
  _id: string
  baseCurrency: {
    _id: string,
    iso: string,
    name: string,
    symbol: string
  }
  buyer: {
    _id: number
    fullName: string
    role: number
  }
  cancellationCause: string
  cancelledBy: {
    _id: number
    fullName: string
    role: number
  }
  completedBy: {
    _id: number
    fullName: string
    role: number
  }
  currency: {
    _id: string
    iso: string
    name: string
    symbol: string
  }
  dateCancelled: number
  dateCompleted: number
  dateCreated: number
  dateReturned: number
  dateTaken: number
  dateUpdated: number
  description: string
  driveID: string
  driveLink: string
  farmer: {
    _id: number
    fullName: string
    role: number
  }
  fileName: string
  location: {
    _id: string
    iso: string
    name: string
  }
  price: number
  quantity: number
  rate: number
  returnedBy: {
    _id: number
    fullName: string
    role: number
  }
  status: number
  takenBy: {
    _id: number
    fullName: string
    role: number
  }
  team: {
    id: number
    teamlead: {
      _id: number
      fullName: string
      role: number
    }
  }
  total: number
  type: {
    _id: string
    name: string
  }
  updatedBy: {
    _id: number
    fullName: string
    role: number
  }
  valid: number
}

interface IState {
  pending: tableBody[] | null
  inWork: tableBody[] | null
  completed: tableBody[] | null
  declined: tableBody[] | null
  loading: boolean
  error?: string
}

const initialState: IState = {
  pending: null,
  inWork: null,
  completed: null,
  declined: null,
  loading: false,
  error: null
}

const MainTableSlice: Slice = createSlice({
  name: "mainTables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMainTableByStatus.fulfilled, (state, { payload }) => {
      const status = payload?.status
      state[statusOfTables[status]] = payload
      state.loading = false
    })
    builder.addCase(fetchMainTableByStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchMainTableByStatus.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default MainTableSlice.reducer