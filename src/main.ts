import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入Vue App
import App from './App.vue'

// 引入全局样式
import '@/styles/index.module.scss'

// 引入路由
import router from './router'
import '@/permission'

// 引入element-ui组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn' // 中文
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文

// 引入svg
import svgIcon from '@/icons/index.vue'

// 创建Vue3实例
const app = createApp(App)

// 使用路由
app.use(router)
// 使用Pinia
app.use(createPinia())
// 使用Element UI Plus
app.use(ElementPlus, { locale })
// 注册svg组件
app.component('svg-icon', svgIcon)
// 挂载到根组件上
app.mount('#app')
