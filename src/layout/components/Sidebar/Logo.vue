<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <!-- 跳转到首页 -->
    <transition name="sidebarLogoFade">
      <!-- 根据collapse控制Logo组件，即是否显示标题 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logoInfo.logo" :src="logoInfo.logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ logoInfo.title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logoInfo.logo" :src="logoInfo.logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ logoInfo.title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'

defineProps({
  collapse: {
    type: Boolean,
    require: true
  }
})

const logoInfo = reactive({
  title: 'vue3 admin template',
  // vite获取静态资源路径
  logo: new URL('../../../assets/logo.png', import.meta.url).href
})

</script>

<style lang="scss" scoped>
// 动画样式
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
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

  .collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
