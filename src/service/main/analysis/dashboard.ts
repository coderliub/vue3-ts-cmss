import lbRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = 'goods/category/count',
  categoryGoodsSales = 'goods/category/sale',
  categoryGoodsFavor = 'goods/category/favor',
  addressGoodsSale = 'goods/address/sale'
}

export function getCategoryGoodsCount() {
  return lbRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return lbRequest.get({
    url: DashboardAPI.categoryGoodsSales
  })
}

export function getCategoryGoodsFavor() {
  return lbRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return lbRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
