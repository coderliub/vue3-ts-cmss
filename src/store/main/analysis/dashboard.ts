import { Module } from 'vuex'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'
import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

const dashboard: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, categoryGoodsCount) {
      state.categoryGoodsCount = categoryGoodsCount
    },
    changeCategoryGoodsSale(state, categoryGoodsSales) {
      state.categoryGoodsSale = categoryGoodsSales
    },
    changeCategoryGoodsFavor(state, categoryGoodsFavor) {
      state.categoryGoodsFavor = categoryGoodsFavor
    },
    changeAddressGoodsSale(state, addressGoodsSale) {
      state.addressGoodsSale = addressGoodsSale
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      // 2.请求数据
      const categoryCountResult = await getCategoryGoodsCount()
      // 3.提交mutations
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categorySalesResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySalesResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      const addressSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressSaleResult.data)
    }
  }
}

export default dashboard
