import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LBRequestInterceptors, LBRequestConfig } from './type'
import localCache from '@/utils/cache'

// import { ElLoading } from 'element-plus/lib/index'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class LBRequest {
  instance: AxiosInstance
  interceptors?: LBRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  // 主要是为了创建实例的时候能传入拦截器
  constructor(config: LBRequestConfig<any>) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 保存拦截器
    this.interceptors = config.interceptors

    // 1.从config中取出的拦截器是对应的实例的拦截器
    // 先添加了实例自己设置的拦截器，后添加了所有实例共有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestinterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseinterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      // 请求是后添加的先执行
      (config) => {
        // console.log('所有的实例都有的拦截器：请求成功拦截')
        const token = localCache.getCache('token')
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`
        }

        // 判断是否需要添加loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            // spinner:
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      // 响应是先添加的先执行,先执行了上面的拦截器，所以永远不会走err
      (res) => {
        // console.log('所有的实例都有的拦截器：响应成功拦截')

        // 将loading移除
        this.loading?.close()
        // res被axios做了一层封装，实际的数据在res.data里
        const data = res.data
        return data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：响应失败拦截')
        // 将loading移除
        this.loading?.close()
        if (err.response.status === 400) {
          console.log('400的错误')
        }
        // 判断不同的httpErrorCode显示不同的错误信息，真实开发用switch
        return err
      }
    )
  }

  request<T = any>(config: LBRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1,单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // .requestInterceptor(config)就是一个函数,对config做了一个转化，转化完后把默认config返回
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要给showloading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.请求完成后，设置回默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          // console.log(res)
          resolve(res)
        })
        .catch((err) => {
          // 错误的情况下也请求完成后，设置回默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          console.log(err)
          reject(err)
        })
    })
  }

  get<T = any>(config: LBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: LBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LBRequest
