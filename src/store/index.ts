import { createStore } from 'vuex'

import { IRootState } from './types'

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

export default store
