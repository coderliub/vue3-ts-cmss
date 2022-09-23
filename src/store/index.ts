import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import login from './login/login'

// 指定 state 的类型
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderlb',
      age: 23
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 创建自己的useStore()并导出
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
