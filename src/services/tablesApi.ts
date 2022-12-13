import { TableRequest } from "./types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_BASE_URL }),
  endpoints: (builder) => ({
    getTable: builder.query<TableRequest, string>({
      // @ts-ignore
      query: (status, startDate, endDate) => ({
        url: "tableData/get",
        params: {
          status, startDate, endDate
        }
      }),
    }),
  }),
})

// @ts-ignore
export const { useGetTables } = tablesApi