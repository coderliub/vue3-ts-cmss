import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 2.根据userMenus动态添加路由
  // webpack进行操作
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // routeFiles.keys获取的是文件路径
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    // 获取文件模块,拿到文件导出的对象
    const route = require('../router/main' + key.split('.')[1])
    console.log(route)
    allRoutes.push(route.default)
  })

  // console.log(allRoutes)
  // 3.根据userMenus过滤routes
  // userMenus: [{},{}]
  // type === 1 -> children -> type === 1 -> children
  // type === 2 -> url -> route
  const _recurseGetRoute = (userMenus: any[]) => {
    userMenus.forEach((menu) => {
      if (menu.type === 1) {
        _recurseGetRoute(menu.children)
      } else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
      }
    })
  }

  _recurseGetRoute(userMenus)

  // 4.返回过滤后的routes
  return routes
}
