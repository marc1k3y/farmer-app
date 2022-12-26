import { createSlice, Slice } from "@reduxjs/toolkit"
import { fetchTableByStatus } from "../../http/mainTablesThunk"

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

type periodSelector = {
  from: unknown
  to: unknown
}

interface IState {
  pending: tableBody[] | null
  inWork: tableBody[] | null
  completed: tableBody[] | null
  declined: tableBody[] | null
  loading: boolean
  error?: string
  tableStatus?: string
  currentOrder?: string
  period: periodSelector
}

const initialState: IState = {
  pending: null,
  inWork: null,
  completed: null,
  declined: null,
  loading: false,
  error: null,
  tableStatus: null, // temp
  currentOrder: null,
  period: {
    from: null,
    to: null
  }
}

const MainTableSlice: Slice = createSlice({
  name: "mainTables",
  initialState,
  reducers: {
    setTableStatus(state, { payload }) {
      state.tableStatus = payload
    },
    setCurrentOrder(state, { payload }) {
      state.currentOrder = payload
    },
    setPeriod(state, { payload }) {
      state.period = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableByStatus.fulfilled, (state, { payload }) => {
      state[state.tableStatus] = payload
      state.loading = false
    })
    builder.addCase(fetchTableByStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTableByStatus.rejected, (state, { error }) => {
      state.error = error.message
      state.loading = false
    })
  }
})

export default MainTableSlice.reducer
export const { setTableStatus, setCurrentOrder, setPeriod } = MainTableSlice.actions