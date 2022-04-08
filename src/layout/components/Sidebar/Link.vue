<template>
  <!-- 动态组件 is的值是哪个组件的名称就显示哪个组件 -->
  <component :is="type" v-bind="linkProps(props.to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

/**
 * @param {string} path
 * @returns {Boolean}
 */
// 判断是否是外部链接
const isExternal = (path:string):boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const isExternalValue = computed(() => isExternal(props.to))

// 决定组件类型
const type = computed(() => {
  if (isExternalValue.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to:string) => {
  if (isExternalValue.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
