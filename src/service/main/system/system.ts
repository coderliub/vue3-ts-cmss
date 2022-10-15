import lbRequest from '@/service'

import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return lbRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return lbRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return lbRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function updataPageData(url: string, editData: any) {
  return lbRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
