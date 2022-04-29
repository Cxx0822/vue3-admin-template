<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- 面包屑组件 -->
      <!-- 循环遍历生成面包屑路由 -->
      <el-breadcrumb-item v-for="(item,index) in breadcrumbInfo.levelList" :key="item.path">
        <!-- 最里层的路由为当前路由 不添加点击事件 -->
        <span
          v-if="item.redirect==='noRedirect'||index==breadcrumbInfo.levelList.length-1"
          class="no-redirect">
          {{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// npm install path-to-regexp
import * as pathToRegexp from 'path-to-regexp'

import { reactive, watch } from 'vue'

import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbInfo = reactive({
  levelList: [] as Array<RouteRecordRaw> | Array<any>
})

// 监测当前的路由变化
watch(route, () => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }
  // 更新面包屑路由
  getBreadcrumb()
})

const getBreadcrumb = () => {
  // 只显示含有 meta.title 属性的路由
  let matched:Array<any> = route.matched.filter(item => item.meta && item.meta.title)

  // 获取路由的根地址
  const first = matched[0]

  // 如果不是首页，则加上首页的面包屑
  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
  }

  // 再次过滤 满足指定条件
  breadcrumbInfo.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

// 判断是否是首页路由
const isDashboard = (route:RouteRecordRaw) => {
  const name = route && route.name as string
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

// 点击面包屑跳转路由
const handleLink = (item:RouteRecordRaw) => {
  const { redirect, path } = item
  // 如果存在 redirect 属性(此时是嵌套路由) 则直接跳转至该路由
  if (redirect) {
    router.push(redirect as string)
    return
  }
  // 跳转至编译后的路由
  router.push(pathCompile(path))
}

// 编译路由
const pathCompile = (path:string) => {
  // 解决带有参数的路由跳转问题
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  const toPath = pathToRegexp.compile(path)
  return toPath(params)
}

// 初始化刷新路由
getBreadcrumb()
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
