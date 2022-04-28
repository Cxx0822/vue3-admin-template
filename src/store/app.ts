import { defineStore } from 'pinia'
// npm install js-cookie --save
import Cookies from 'js-cookie'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      // !!:转为布尔值
      // 保存当前菜单栏显示和隐藏的状态
      opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true as boolean,
      withoutAnimation: false as boolean
    },
    device: 'desktop' as string
  }),

  actions: {
    // 控制菜单栏显示和隐藏的切换
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    }
  }
})
