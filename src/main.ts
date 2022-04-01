import { createApp } from 'vue'

// 引入Vue App
import App from './App.vue'

// 引入路由
import router from './router'

// 创建Vue3实例
const app = createApp(App)

// 使用路由
app.use(router)
// 挂载到根组件上
app.mount('#app')
