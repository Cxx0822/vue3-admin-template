<template>
  <!-- 状态栏组件 -->
  <div class="footerbar">
    <!-- 右下角状态栏 -->
    <div class="right-menu">
      <span class="right-menu-item hover-effect">状态栏</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.footerbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 15px;

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
  }
}
</style>
