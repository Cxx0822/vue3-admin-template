<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="loginFormRef"
      :model="loginInfo.loginForm"
      class="login-form"
    >
      <!-- username表单选项 -->
      <el-form-item prop="username">
        <!-- username输入框 -->
        <el-input
          v-model="loginInfo.loginForm.username"
          placeholder="用户名"
        />
      </el-form-item>

      <!-- password表单选项 -->
      <el-form-item prop="password">
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

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  background-color: white;

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
  }
}
</style>
