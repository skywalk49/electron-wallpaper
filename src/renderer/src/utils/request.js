import axios from "axios"

const service = axios.create({
    baseURL: "http://wallpaper.apc.360.cn",
    timeout: 0,
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.error(error)
    }
)

service.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error)
    }
)

export default service