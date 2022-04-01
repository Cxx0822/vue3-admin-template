import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 导入全局布局组件
import Layout from '@/layout/index.vue'

export const constantRoutes: Array<RouteRecordRaw> | any = [
  // 登录路由
  {
    path: '/login',
    // 引入登录页面
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  // 首页路由
  {
    path: '/',
    // 使用全局组件布局
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        // 引入首页页面
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', noCache: true, icon: 'dashboard', affix: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
