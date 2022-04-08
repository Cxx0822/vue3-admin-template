<template>
  <div v-if="!item.hidden">
    <!-- 只有单个child -->
    <template
      v-if="hasOneShowingChild(item.children,item)
        && (!sidebarInfo.onlyOneChild.children
        || sidebarInfo.onlyOneChild.noShowingChildren)
        && !item.alwaysShow">
      <!-- 判断是路由还是链接 -->
      <app-link v-if="sidebarInfo.onlyOneChild.meta" :to="resolvePath(sidebarInfo.onlyOneChild.path)">
        <!-- el-menu菜单项 -->
        <el-menu-item :index="resolvePath(sidebarInfo.onlyOneChild.path)" :class="{'submenu-title-noDropdown':!props.isNest}">
          <!-- 菜单内容 -->
          <item
            :icon="sidebarInfo.onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="sidebarInfo.onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有多个children -->
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 循环生成组件 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
// vite 源码中设定了不允许在客户端代码中访问内置模块代码
// 使用 path-browserify 代替 path 模块
import path from 'path-browserify'
import Item from './Item.vue'
import AppLink from './Link.vue'

import { defineProps, reactive } from 'vue'

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const sidebarInfo = reactive({
  onlyOneChild: null as any
})

const hasOneShowingChild = (children:Array<any> = [], parent:any) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      sidebarInfo.onlyOneChild = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    sidebarInfo.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
const isExternal = (path:string):boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const resolvePath = (routePath:string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
