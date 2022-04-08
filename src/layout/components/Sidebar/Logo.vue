<template>
  <div class="sidebar-logo-container">
    <!-- 跳转到首页 -->
    <router-link key="collapse" class="sidebar-logo-link" to="/">
      <!-- 图标 + 标题 -->
      <img v-if="logoInfo.logo" :src="logoInfo.logo" class="sidebar-logo">
      <h1 class="sidebar-title">{{ logoInfo.title }} </h1>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const logoInfo = reactive({
  title: 'vue3 admin template',
  // vite获取静态资源路径
  logo: new URL('../../../assets/logo.png', import.meta.url).href
})

</script>

<style lang="scss" scoped>
// 侧边栏样式
.sidebar-logo-container {
  position: relative;
  height: 60px;
  line-height: 60px;
  background: #FFFFFF;
  text-align: center;
  overflow: hidden;
  border-top: 2px solid #008B93;
  border-right: 2px solid #008B93;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    // 侧边栏标题样式
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #000;
      font-weight: 600;
      line-height: 50px;
      font-size: 0.9vmax;
      font-family: Times New Roman;
      vertical-align: middle;
    }
  }
}
</style>
