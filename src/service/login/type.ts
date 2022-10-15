// 用户输入数据的类型
export interface IAccount {
  name: string
  password: string
}

// 返回的data的数据类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}
