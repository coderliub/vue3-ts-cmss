import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

// ILoginState: 指定 state 的类型,IRootState: 指定根 state 的类型
const loginMoudel: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus: 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      // 网络请求失败
      if (!loginResult) {
        return
      }
      ElMessage.success('登录成功')
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 保存token到本地
      localCache.setCache('token', token)

      // 发送初始化请求完整的role/deportment
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 把用户信息缓存到本地
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 如果直接跳到首页让vuex获取本地保存的数据
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化请求完整的role/deportment
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    // phoneLoginAction({ commit }, payload: IAccount) {
    //   console.log('执行了phoneLoginAction', payload)
    // }

    // 退出登录
    logoutAction({ commit }) {
      // 清除vuex以及本地的token,userInfo,userMenus
      commit('changeToken', '')
      commit('changeUserInfo', {})
      commit('changeUserMenus', [])
      localCache.deleteCache('token')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      // 跳转到登录页
      router.push('/login')
    }
  }
}

export default loginMoudel
