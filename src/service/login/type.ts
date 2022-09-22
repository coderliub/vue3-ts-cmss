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

// 返回数据对象的类型
export interface IDatatype<T = any> {
  code: number
  data: T
}
