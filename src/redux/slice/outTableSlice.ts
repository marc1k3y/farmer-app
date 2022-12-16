import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit"
import { $authHost } from "../http"

interface ICreateAR {
  currencyID: string
  locationID: string
  typeID: string
  quantity: number
  price: number
  description: string
}

const createAccountRequest = createAsyncThunk(
  "createAccountRequest",
  async (requestBody: ICreateAR) => {
    const res = await $authHost.post("accountRequests/create", requestBody)
    return res
  }
)

export const fetchTeamNumber = createAsyncThunk(
  "get/farmerTeams",
  async () => {
    const res = await $authHost.get("farmerAccess/get/teams")
    return res.data
  }
)

const OutTableSlice: Slice = createSlice({
  name: "outTableSlice",
  initialState: {
    buyerData: [],
    farmerData: [],
    teamLeadData: [],
    teamNumberData: [],
    loading: false,
    error: null,
    modalVisible: false,
    approve: true
  },
  reducers: {
    showModal(state) {
      state.modalVisible = true
    },
    hideModal(state) {
      state.modalVisible = false
    },
    setApproveCreate(state, { payload }) {
      state.approve = payload.status
      createAccountRequest(payload.requestBody)
    }
  },
  extraReducers: (builder) => {
    // team manage list
    builder.addCase(fetchTeamNumber.fulfilled, (state, { payload }) => {
      state.teamNumberData = payload
      state.loading = false
    })
    builder.addCase(fetchTeamNumber.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeamNumber.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export default OutTableSlice.reducer
export const { showModal, hideModal, setApproveCreate } = OutTableSlice.actions