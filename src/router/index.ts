import { createRouter, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/MainPage.vue')
  }
]

const router = createRouter({
  routes,
  history: createMemoryHistory()
})

export default router
