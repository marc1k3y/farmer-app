import axios from "axios"
import { api } from "../constants"

const $host = axios.create({ baseURL: api })
const $authHost = axios.create({ baseURL: api })

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }