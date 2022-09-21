import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LBRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestinterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseinterceptorCatch?: (error: any) => any
}

export interface LBRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LBRequestInterceptors<T>
  showLoading?: boolean
}
