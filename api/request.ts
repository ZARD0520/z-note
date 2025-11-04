import { RequestMethodType, RequestOptions } from "@/type/common/request"

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api'

const requestClient = async <T = any>(method: RequestMethodType, url: string, options: RequestOptions): Promise<T> => {
  const {
    params,
    data,
    headers = {},
    timeout = 10000,
    withCredentials = false
  } = options

  const fullUrl = params
    ? `${url}?${new URLSearchParams(params)}`
    : url

  let body: BodyInit | undefined

  if (data instanceof FormData) {
    body = data
  } else if (typeof data === 'object' && data !== null) {
    body = JSON.stringify(data)
    ;(headers as Record<string, string>)['Content-Type'] ||= 'application/json'
  } else {
    body = data
  }

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const res = await fetch(fullUrl, {
    method,
    headers,
    body,
    credentials: withCredentials ? 'include' : 'same-origin',
    signal: controller.signal
  }).finally(() => clearTimeout(id))

  if (!res.ok) throw new Error(res.statusText || `Request failed with ${res.status}`)

  if (res.headers.get('Content-Length') === '0') return undefined as T

  const resData = await res.json()

  return resData.data
}

const quickAction = {
  get<T>(url: string, params?: Record<string, any>, opts?: Omit<RequestOptions, 'data'>) {
    return requestClient<T>('GET', baseUrl + url, { ...opts, params })
  },
  post<T>(url: string, data?: Record<string, any>, opts?: Omit<RequestOptions, 'data'>) {
    return requestClient<T>('POST', baseUrl + url, { ...opts, data })
  },
  put<T>(url: string, data?: Record<string, any>, opts?: Omit<RequestOptions, 'data'>) {
    return requestClient<T>('PUT', baseUrl + url, { ...opts, data })
  },
  delete<T>(url: string, opts: Omit<RequestOptions, 'data'>) {
    return requestClient<T>('DELETE', baseUrl + url, opts)
  },
  upload<T>(url: string, formData: FormData, opts?: Omit<RequestOptions, 'data'>) {
    return requestClient<T>('POST', baseUrl + url, { ...opts, data: formData })
  }
}

export default quickAction