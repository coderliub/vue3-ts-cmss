// 1.手动的切换不同的环境
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'
// 其他文件

// const BASE_URL = 'http://coderwhy.org/prod''/api'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：production
// 测试环境：test
// let BASE_URL = ''
// const TIME_OUT = 10000

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = '/api'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = '/api'
// } else {
//   BASE_URL = '/api'
// }

// export { BASE_URL, TIME_OUT }

export const BASE_URL = process.env.VUE_APP_BASE_URL

export const TIME_OUT = 10000
