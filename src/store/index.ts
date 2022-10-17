import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import login from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

// 指定 state 的类型
const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList) {
      state.entireMenu = menuList
    }
  },
  getters: {
    entireDepartment(state) {
      return state.entireDepartment
    },
    entireRole(state) {
      return state.entireRole
    }
  },
  actions: {
    // 获取部门列表
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      // 获取角色列表
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      // 获取菜单列表
      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data

      // 保存部门列表
      commit('changeEntireDepartment', departmentList)
      // 保存角色列表
      commit('changeEntireRole', roleList)
      // 保存菜单列表
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    analysis
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 创建自己的useStore()并导出
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
