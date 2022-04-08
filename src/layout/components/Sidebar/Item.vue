<template>
  <div class="item-div">
    <!-- 图标/图片 + 标题 -->
    <img v-if="props.icon" :src="getImageUrl(props.icon)">
    <span>{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

// 获取图片路径
const getImageUrl = (icon:string):string => {
  return '../../src/assets/' + icon + '.png'
}

</script>

<style lang="scss" scoped>
.item-div {
  img {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
  }

  span {
    margin-left: 10px;
    font-size: 14px;
  }
}

</style>
