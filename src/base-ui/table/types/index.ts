export interface ITableItem {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
}

export interface ITable {
  title: string
  newBtnTitle?: string
  propList: ITableItem[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  childrenProps?: object
  showFooter?: boolean
}
