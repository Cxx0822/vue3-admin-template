<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <!-- :to: 点击会跳转至相应路由 -->
      <!-- click.middle.native: 按下鼠标中键关闭标签导航 -->
      <router-link
        v-for="tag in visitedViews"
        ref="routerLinkRef"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : '' "
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : '' "
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <!-- 下拉选择框 -->
    <ul
      v-show="tagsViewInfo.visible"
      :style="{ left: tagsViewInfo.left + 'px',top: tagsViewInfo.top + 'px' }"
      class="contextmenu">
      <li @click="refreshSelectedTag(tagsViewInfo.selectedTag)">刷新</li>
      <li v-if="!isAffix(tagsViewInfo.selectedTag)" @click="closeSelectedTag(tagsViewInfo.selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(tagsViewInfo.selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ScrollPane from './ScrollPane.vue'
import { nextTick, onMounted, reactive, ref, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { computed } from '@vue/reactivity'

import { useRoute, useRouter, RouteRecordRaw, RouteRecordName, RouteLocationNormalizedLoaded } from 'vue-router'
import { useTagsViewStore } from '@/store/tagsViews'

import { constantRoutes } from '@/router/index'

// 使用 path-browserify 代替 path 模块
import path from 'path-browserify'

const route = useRoute()
const router = useRouter()

const tagsViewStore = useTagsViewStore()

const routerLinkRef = ref<any>([])
const scrollPaneRef = ref()

// 获取当前实例
// setup执行时 组件还没有创建 无法直接获取实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface TagsViewsIF extends RouteLocationNormalizedLoaded {
  title?: string
  meta: {
    title?: string,
    noCache?: boolean,
    affix?: boolean
  }
}

const tagsViewInfo = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as TagsViewsIF,
  affixTags: [] as Array<TagsViewsIF>
})

// 访问过的路由
const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
})

const routes = computed(() => {
  return constantRoutes
})

// 监视路由变化
watch(route, () => {
  addTags()
})

// 监视 tagsViewInfo 对象的 visible 值
watch(() => tagsViewInfo.visible, (newValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

// 初始化
onMounted(() => {
  initTags()
  addTags()
})

// 初始化标签
const initTags = () => {
  // 获取需要展示在标签导航中的路由(meta 的 affix 属性值为 true)
  const affixTags = tagsViewInfo.affixTags = filterAffixTags(routes.value)
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      // 存储初始化的标签
      tagsViewStore.addVisitedView(tag)
    }
  }
}

// 将当前路由存储至标签中
const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addView(route)
  }
  return false
}

// 判断当前路由是否处于激活状态
const isActive = (currentRoute:TagsViewsIF) => {
  return currentRoute.path === route.path
}

// 判断标签是否固定
const isAffix = (tag:TagsViewsIF) => {
  return tag.meta && tag.meta.affix
}

// 过滤路由中含有 meta.affix 属性值的
const filterAffixTags = (routes:RouteRecordRaw[], basePath = '/') => {
  let tags:Array<any> = []
  routes.forEach(route => {
    // 如果路由有 meta 属性值，且 meta 的 affix 属性值为 true
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      // 添加至 标签数组 中
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name as string,
        meta: { ...route.meta }
      })
    }
    // 如果路由有子路由
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

// 刷新当前路由
const refreshSelectedTag = (view: TagsViewsIF) => {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: fullPath
      })
    })
  })
}

// 关闭当前路由
const closeSelectedTag = (view: TagsViewsIF) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

// 关闭其他路由
const closeOthersTags = () => {
  router.push(tagsViewInfo.selectedTag)
  tagsViewStore.delOthersViews(tagsViewInfo.selectedTag)
}

// 关闭所有路由
const closeAllTags = (view: TagsViewsIF) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (tagsViewInfo.affixTags.some(tag => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

// 定位最后一次访问的路由
const toLastView = (visitedViews:Array<TagsViewsIF>, view: TagsViewsIF) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

// 右击打开标签菜单
const openMenu = (tag:RouteLocationNormalizedLoaded, e:PointerEvent) => {
  const menuMinWidth = 105
  const offsetLeft = (proxy as any).$el.getBoundingClientRect().left // container margin left
  const offsetWidth = (proxy as any).$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    tagsViewInfo.left = maxLeft
  } else {
    tagsViewInfo.left = left
  }

  tagsViewInfo.top = e.clientY
  tagsViewInfo.visible = true
  tagsViewInfo.selectedTag = tag
}

// 关闭下拉菜单
const closeMenu = () => {
  tagsViewInfo.visible = false
}

// 处理滚动事件
const handleScroll = () => {
  // 鼠标滚动时 关闭下拉菜单显示
  closeMenu()
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
