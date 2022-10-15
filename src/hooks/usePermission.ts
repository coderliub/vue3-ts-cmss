import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermissions = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermissions)
}

// export function usePermission(pageName: string, handleName: string) {
//   const store = useStore()
//   const userPermissions = store.state.login.permissions
//   const pagePermissions = (userPermissions as any)[pageName]
//   if (!pagePermissions) {
//     return false
//   }
//   includes判断是否包含字符串，判断是否有权限
//   return pagePermissions.includes(handleName)
// }
