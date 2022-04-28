<template>
  <div>
    <!-- 左上角图标 -->
    <logo :collapse="isCollapse"/>
    <!-- 菜单滚动条区域 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单栏 -->
      <el-menu
        :collapse="isCollapse"
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
import { computed } from 'vue'

import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const isCollapse = computed(() => !appStore.sidebar.opened)

</script>
