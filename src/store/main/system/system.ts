import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState, IPagePayload } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  updataPageData
} from '@/service/main/system/system'

// const pageUrlMap = {
//   user: '/users/123/list',
//   role: '/roles/abc/list'
// }

const systemModule: Module<ISystemState, IRootState> = {
  // 给作用域
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPagePayload) {
      // console.log(payload)
      const pageName = payload.pageName
      // 1.接口定义规范的情况下，可以直接使用
      const pageUrl = `/${pageName}/list`

      // 2.接口定义不规范的话需要自己处理，switch方法
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 3.接口定义不规范的话需要自己处理，map方法
      // const pageUrl = pageUrlMap[pageName]

      // 1. 请求数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 2. 将数据提交给mutation
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取pageName和id
      // pageName -> /users
      const { pageName, id } = payload
      // id -> /users/id
      const pageUrl = `/${pageName}/${id}`

      // 2.调用删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求列表数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和数据
      const { pageName, newData } = payload
      // 2.调用新增网络请求
      await createPageData(`/${pageName}`, newData)
      // 3.重新请求列表数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async updataPageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和数据
      const { pageName, editData, id } = payload
      // 2.调用修改网络请求
      const pageUrl = `/${pageName}/${id}`
      await updataPageData(pageUrl, editData)
      // 3.重新请求列表数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
