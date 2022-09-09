<template>
  <section class="app-main">
    <!-- 路由显示 -->
    <router-view/>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.app-main {
  /* 总高度 - Navbar - TagsView - Footerbar */
  min-height: calc(100vh - 50px - 50px - 34px);
  width: 100%;
  position: relative;
  overflow: hidden;

  padding-top: 10px;
}

</style>

<style lang="scss">

</style>

