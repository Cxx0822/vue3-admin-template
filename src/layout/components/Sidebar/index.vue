<template>
  <div class="sidebar-container">
    <!-- 左上角图标 -->
    <logo />
    <!-- 菜单滚动条区域 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单栏 -->
      <el-menu
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 菜单项 -->
        <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

import { constantRoutes } from '@/router/index'

</script>

<style lang="scss">
@import "@/styles/variables.module.scss";
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-decoration:none
  }

  .svg-icon {
    margin-right: 16px;
  }

  .sub-el-icon {
    margin-right: 12px;
    margin-left: -2px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-sub-menu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  .is-active>.el-sub-menu__title {
    color: $subMenuActiveText !important;
  }

  & .nest-menu .el-sub-menu>.el-sub-menu__title,
  & .el-sub-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
</style>

<style lang="scss" scoped>

</style>
