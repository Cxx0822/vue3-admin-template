<template>
  <div id="app">
    <!-- 路由显示 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

html {
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  // 统一设置高度为100%
  height: 100%;
}
</style>
