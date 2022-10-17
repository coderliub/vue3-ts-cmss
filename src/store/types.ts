import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

// 定义根state类型
export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 定义根state下的模块类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IDashboardState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
