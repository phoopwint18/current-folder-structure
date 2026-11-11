export type ApiError = {
  message: string
  statusCode: number
}

export interface DataResponse<T> {
  data: T
  message: string
  status: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
}
