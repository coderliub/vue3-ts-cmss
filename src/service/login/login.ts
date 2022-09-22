import lbRequest from '../index'

import { IAccount, IDatatype, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法/users/1
  UserMenus = '/role/' //  + id + /menu
}

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return lbRequest.post<IDatatype<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return lbRequest.get<IDatatype>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return lbRequest.get<IDatatype>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
