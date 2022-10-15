import lbRequest from '../index'

import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法/users/1
  UserMenus = '/role/' //  + id + /menu
}

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return lbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return lbRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return lbRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
