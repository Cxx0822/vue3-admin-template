<template>
  <!-- 全局布局组件 -->
  <div class="app-wrapper">
    <!-- 侧边栏组件 -->
    <Sidebar class="sidebar-container"/>
    <!-- 主体区域 -->
    <div class="main-container">
      <!-- 导航栏 -->
      <navbar class="navbar-container"/>
      <!-- 页面主体区域 -->
      <app-main />
      <!-- 状态栏 -->
      <Footerbar class="footerbar-container"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import Footerbar from './components/Footerbar.vue'

</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    position: relative;

    .navbar-container {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }

    .footerbar-container {
      width: 100%;
      position: absolute;
      bottom: 0px;
      background: $footerbarBg;
    }
  }
}
</style>
