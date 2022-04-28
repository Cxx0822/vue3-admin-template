<template>
  <!-- 全局布局组件 -->
  <div :class="classObj" class="app-wrapper">
    <!-- 侧边栏组件 -->
    <Sidebar class="sidebar-container"/>

    <!-- 主体区域 -->
    <div class="main-container">
      <div>
        <!-- 导航栏 -->
        <navbar />
      </div>

      <!-- 页面主体区域 -->
      <app-main />

      <div class="footerbar-container">
        <Footerbar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import Footerbar from './components/Footerbar.vue'

import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const app = useAppStore()

const classObj = computed(() => {
  // 控制侧边栏的显示状态
  return {
    hideSidebar: !app.sidebar.opened,
    openSidebar: app.sidebar.opened,
    withoutAnimation: app.sidebar.withoutAnimation,
    mobile: app.device === 'mobile'
  }
})
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.module.scss";
@import "@/styles/variables.module.scss";
@import "@/styles/sidebar.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  .footerbar-container {
    width: 100%;
    position: absolute;
    bottom: 0px;
    background: $footerbarBg;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
}
</style>
