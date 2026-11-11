import type { AxiosResponse } from 'axios'
import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'

export async function uploadFile(file: File, filePath = 'NINJA_TICKET') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('filePath', filePath)

  const url = await apiClient.post<string>(API_ENDPOINTS.FILES.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  if (!url?.trim()) {
    throw new Error('Unable to upload file')
  }

  return url.trim()
}

export async function uploadFiles(files: Array<File | undefined | null>) {
  const urls = await Promise.all(
    files.filter((file): file is File => file instanceof File).map((file) => uploadFile(file)),
  )

  return urls.filter(Boolean)
}

function getFileInfo(contentDisposition?: string | null) {
  if (!contentDisposition) {
    return undefined
  }

  const encoded = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  const quoted = contentDisposition.match(/filename="([^"]+)"/i)
  const plain = contentDisposition.match(/filename=([^;]+)/i)
  const raw = encoded?.[1] || quoted?.[1] || plain?.[1] || ''
  const fullName = decodeURIComponent(raw.trim().replace(/"/g, ''))
  const extension = fullName.includes('.') ? fullName.split('.').pop() : ''

  return { fullName, extension }
}

export async function downloadFile({
  url = API_ENDPOINTS.FILES.download,
  params = {},
  fileName = '',
}: {
  url?: string
  params?: Record<string, string>
  fileName?: string
}) {
  const response = (await apiClient.get(url, {
    params,
    responseType: 'blob',
  })) as unknown as AxiosResponse<Blob>

  const disposition = response.headers?.['content-disposition']
  const fileInfo = getFileInfo(
    typeof disposition === 'string' ? disposition : undefined,
  )
  let name = fileName
    ? fileInfo?.extension
      ? `${fileName}.${fileInfo.extension}`
      : fileName
    : fileInfo?.fullName

  if (!name) {
    name = fileInfo?.extension ? `result.${fileInfo.extension}` : 'result'
  }

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(response.data)
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return response
}
