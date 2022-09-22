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

      console.log('请求成功拦截')
      return config
    },
    requestinterceptorCatch: (err) => {
      console.log('请求失败拦截')
      return err
    },
    // 响应拦截器
    responseInterceptor: (res) => {
      console.log('请求响应成功拦截')
      return res
    },
    responseinterceptorCatch(err) {
      console.log('请求响应失败拦截')
      return err
    }
  }
})

export default lbRequest
