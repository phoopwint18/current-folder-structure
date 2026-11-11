import axios, { isAxiosError, type AxiosRequestConfig } from 'axios'
import { env } from '@/core/config'
import { PATHS } from '@/core/routes/path'
import { API_ENDPOINTS } from './endpoints'

const AUTH_ROUTES_WITHOUT_REDIRECT = [
  '/api/auth/login',
  '/api/auth/logout',
  '/employee/profile',
]

let isSigningOut = false

async function signOutAndRedirect() {
  if (isSigningOut) {
    return
  }

  isSigningOut = true

  try {
    await client.post(API_ENDPOINTS.AUTH.logout)
  } catch {
    // Session may already be invalid.
  }

  window.location.assign(PATHS.login)
}

const client = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Type': 'WEB',
  },
})

client.interceptors.response.use(
  (response) => {
    if (response.config.responseType === "blob") {
      return response;
    }

    return response.data;
  },
  (error) => {
    const requestUrl = isAxiosError(error) ? (error.config?.url ?? '') : ''
    const status = isAxiosError(error) ? error.response?.status : undefined
    const shouldSkipRedirect = AUTH_ROUTES_WITHOUT_REDIRECT.some((route) =>
      requestUrl.includes(route),
    )

    if (
      (status === 401 || status === 403) &&
      !shouldSkipRedirect
    ) {
      void signOutAndRedirect()
    }

    return Promise.reject(error)
  },
)

export const apiClient = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return client.get<T, T>(url, config)
  },
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return client.post<T, T>(url, data, config)
  },
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return client.put<T, T>(url, data, config)
  },
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return client.patch<T, T>(url, data, config)
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return client.delete<T, T>(url, config)
  },
}

export function getErrorMessage(error: unknown) {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong'
}
