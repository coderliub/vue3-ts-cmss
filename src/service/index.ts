// service统一的出口
import LBRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const lbRequest = new LBRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 请求拦截器
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestinterceptorCatch: (err) => {
      return err
    },
    // 响应拦截器
    responseInterceptor: (res) => {
      if (res.data.code === -1003) {
        ElMessage.error(res.data.data)
      }
      return res
    },
    responseinterceptorCatch: (err) => {
      if (err.response.status === 400) {
        ElMessage.error(err.response.data)
      }
      return err
    }
  }
})

export default lbRequest
