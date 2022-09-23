import { ILoginState } from './login/types'

// 定义根state类型
export interface IRootState {
  name: string
  age: number
}

// 定义根state下的模块类型
export interface IRootWithModule {
  login: ILoginState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
