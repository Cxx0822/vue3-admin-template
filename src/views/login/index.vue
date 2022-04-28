<template>
  <div class="login-container">
    <!-- 项目标题 -->
    <div class="title-container">
      <h1 class="title">Vue Admin Template</h1>
    </div>

    <!-- 登录表单 -->
    <el-form
      ref="loginFormRef"
      :model="loginInfo.loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <!-- username表单选项 -->
      <el-form-item prop="username">
        <!-- username图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- username输入框 -->
        <el-input
          v-model="loginInfo.loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <!-- password表单选项 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- password输入框 -->
        <el-input
          v-model="loginInfo.loginForm.password"
          placeholder="密码"
        />
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;font-size:18px"
        @click.prevent="handleLogin(loginFormRef)"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'

// 表单引用 固定格式
type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()

const router = useRouter()

// 登录页面数据
const loginInfo = reactive({
  loginForm: {
    username: '',
    password: ''
  }
})

// 处理登录事件
// 这里需要传入表单的ref
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (loginInfo.loginForm.username.trim() !== '' && loginInfo.loginForm.password.trim() !== '') {
        localStorage.setItem('username', loginInfo.loginForm.username)
        // 跳转至首页
        router.push({ path: '/dashboard' || '/' })
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('请输入正确的用户名和密码')
      }
    } else {
      ElMessage.error('请输入正确的用户名和密码')
      return false
    }
  })
}
</script>

<style lang="scss">

@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
  .login-container .el-input input {
    color: #fff;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000000;
      height: 47px;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #e5e5e5 inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #000000;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  background-color: white;

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: #000;
      margin-top: 30px;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    // 表单靠右居中
    position: absolute;
    right: 10%;
    top: 35%;

    width: 400px;
    max-width: 100%;
    padding: 20px 20px 0;
    margin: 0 auto;
    overflow: hidden;

    // 添加外边框
    border-radius: 10px;
    border: 2px solid #008B93;

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #000000;
      vertical-align: middle;
      width: 40px;
      display: inline-block;
    }
  }
}
</style>
