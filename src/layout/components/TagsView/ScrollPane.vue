<template>
  <el-scrollbar
    ref="scrollContainerRef"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import type { ElScrollbar } from 'element-plus'

const scrollContainerRef:any = ref<InstanceType<typeof ElScrollbar>>()

const scrollWrapper = computed(() => {
  return scrollContainerRef.value.$refs.wrap$
})

// 处理鼠标滚动事件
const handleScroll = (e:any) => {
  // 超出范围时 滚动向左向右平移
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  scrollWrapper.value.scrollLeft -= eventDelta / 4
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(scroll-container) {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
