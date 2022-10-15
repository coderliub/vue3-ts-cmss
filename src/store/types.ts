import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

// 定义根state类型
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 定义根state下的模块类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
