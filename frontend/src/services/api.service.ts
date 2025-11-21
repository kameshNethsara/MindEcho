import axios, { AxiosError } from "axios"
import { refreshTokens } from "./auth.service"

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
})

// An interceptor is like a middleware for Axios requests and responses.
// It lets you intercept, modify, or analyze any API request or response before it goes out or comes back.

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register"]

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")

  const isPUblic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

  if (!isPUblic && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error:AxiosError) => {
    const originalRequest: any = error.config
    
    if (error.response?.status === 401 && !PUBLIC_ENDPOINTS.some((url) =>
      originalRequest.url?.includes(url) && originalRequest._retry)
    ){
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          throw new Error("Refresh token not found") //throw karama return ona naaa
        }
        const data = await refreshTokens(refreshToken)

        localStorage.setItem("accessToken", data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return axios(originalRequest)
      } catch (refreshErr) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        console.error("Error refreshing token:", refreshErr)
        return Promise.reject(refreshErr)
      }
      
    }
    return Promise.reject(error)
   })

export default api
