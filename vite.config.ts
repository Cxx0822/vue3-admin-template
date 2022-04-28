import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入svgBuilder插件
import { svgBuilder } from './src/plugins/svgBuilder'

// 导入path
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/icons/svg/')], // 一次性添加所有的svg 无需在单独导入
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
