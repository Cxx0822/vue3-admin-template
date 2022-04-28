<template>
  <div class="navbar">
    <!-- 控制菜单栏的显示 -->
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <!-- 右上角菜单栏 -->
    <div class="right-menu">
      <span class="right-menu-item">欢迎你 {{ loginInfo.username }}</span>

      <!-- 下拉框组件 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <span class="avatar-wrapper">
          <img src="@/assets/user.png" class="user-avatar">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <!-- 下拉框菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from '@/components/Hamburger/index.vue'

import { ArrowDown } from '@element-plus/icons-vue'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/store/app'

const router = useRouter()

const appStore = useAppStore()

const loginInfo = reactive({
  username: window.localStorage.getItem('username')
})

const sidebar = computed(() => appStore.sidebar)

// 侧边栏控制
const toggleSideBar = () => {
  appStore.toggleSideBar()
}

// 退出登录
const logout = () => {
  window.localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
