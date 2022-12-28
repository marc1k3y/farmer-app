import { createAsyncThunk } from "@reduxjs/toolkit"
import { $authHost } from "."

export const fetchTeamNumbers: any = createAsyncThunk(
  "get/farmerTeams",
  async () => {
    const { data } = await $authHost.get("farmerAccess/get/teams")
    return data
  }
)

export const fetchTeamleadListTable: any = createAsyncThunk(
  "tableData/aggregate/teamleads",
  async (startDate, endDate) => {
    const { data } = await $authHost.get("tableData/aggregate/teamleads", {
      params: { startDate, endDate }
    })
    return data
  }
)

export const fetchBuyerListTable: any = createAsyncThunk(
  "tableData/aggregate/buyers",
  async (startDate, endDate) => {
    const { data } = await $authHost.get("tableData/aggregate/buyers", {
      params: { startDate, endDate }
    })
    return data
  }
)

export const fetchFarmerListTable: any = createAsyncThunk(
  "tableData/aggregate/farmers",
  async (startDate, endDate) => {
    const { data } = await $authHost.get("tableData/aggregate/farmers", {
      params: { startDate, endDate }
    })
    return data
  }
)

export const fetchFarmersForTeamManage: any = createAsyncThunk(
  "farmerAccess/get/farmers",
  async (startDate, endDate) => {
    const { data } = await $authHost.get("farmerAccess/get/farmers", {
      params: { startDate, endDate }
    })
    return data
  }
)

export const addAllAccessTeamManage: any = createAsyncThunk(
  "farmerAccess/add/all",
  async (farmer: any) => {
    const { data } = await $authHost.put("farmerAccess/add/all", {
      farmer
    })
    return data
  }
)

export const revokeAllAccessTeamManage: any = createAsyncThunk(
  "farmerAccess/revoke/all",
  async (farmer: any) => {
    const { data } = await $authHost.put("farmerAccess/revoke/all", {
      farmer
    })
    return data
  }
)