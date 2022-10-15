type IFormType =
  | 'input'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'datetime'
  | 'upload'
  | 'editor'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'color'
  | 'cascader'
  | 'transfer'
  | 'inputNumber'
  | 'textArea'
  | 'password'
  | 'hidden'
  | 'custom'
  | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
