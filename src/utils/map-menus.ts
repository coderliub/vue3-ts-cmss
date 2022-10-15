import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
    // console.log(route)
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
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    })
  }

  _recurseGetRoute(userMenus)

  // 4.返回过滤后的routes
  return routes
}

// 递归查找面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 递归查找菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  _recurseGetPermission(userMenus)
  return permissions

  function _recurseGetPermission(userMenus: any[]) {
    userMenus.forEach((menu) => {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    })
  }
}

export function mapMenusToMenuTree(menuList: any[]) {
  const menuTree: number[] = []
  _recurseGetMenuTree(menuList)
  return menuTree
  // 递归查找并获取叶子节点
  function _recurseGetMenuTree(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetMenuTree(menu.children)
      } else {
        menuTree.push(menu.id)
      }
    }
  }
}

// 递归查找面包屑
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }

//   return breadcrumbs
// }

// 递归查找菜单
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export { firstMenu }
