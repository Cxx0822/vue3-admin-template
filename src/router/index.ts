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
  },
  // 嵌套路由
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '嵌套路由',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        meta: { title: 'Menu 2' }
      }
    ]
  },
  // 外部链接
  {
    path: '/github-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Cxx0822/vue3-admin-template',
        meta: { title: 'github', icon: 'github' }
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
