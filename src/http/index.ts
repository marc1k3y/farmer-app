import axios, { AxiosRequestConfig } from "axios"
import { api } from "../constants"

const $host = axios.create({ baseURL: api })
const $authHost = axios.create({ baseURL: api })

const authInterceptor = (config: AxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }