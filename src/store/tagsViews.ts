import { defineStore } from 'pinia'
import { RouteRecordRaw, RouteRecordName, RouteLocationNormalizedLoaded } from 'vue-router'

interface TagsViewsIF extends RouteLocationNormalizedLoaded {
  title?: string
  meta: {
    title?: string,
    noCache?: boolean,
    affix?: boolean
  }
}

interface AllViewsTF {
  visitedViews: Array<TagsViewsIF>,
  cachedViews: Array<RouteRecordName | null | undefined>
}

// 标签栏导航
export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => ({
    // 定义数据类型
    // 用户访问过的页面
    visitedViews: [] as Array<TagsViewsIF>,
    // 实际keep-alive的路由
    cachedViews: [] as Array<RouteRecordName | null | undefined>
  }),
  actions: {
    // 增加导航路由
    addView(view:TagsViewsIF) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view:TagsViewsIF) {
      if (this.visitedViews.some(v => v.path === view.path)) return

      this.visitedViews.push(
        Object.assign({}, view, { title: view.meta.title || 'no-name' })
      )
    },
    addCachedView(view:TagsViewsIF) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    // 删除导航路由
    delView(view: TagsViewsIF) {
      return new Promise<AllViewsTF>(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)

        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view: TagsViewsIF) {
      return new Promise<Array<TagsViewsIF>>(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }

        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: TagsViewsIF) {
      return new Promise<Array<RouteRecordName | null | undefined>>(resolve => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)

        resolve([...this.cachedViews])
      })
    },
    delOthersViews(view: TagsViewsIF) {
      return new Promise<AllViewsTF>(resolve => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)

        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view: TagsViewsIF) {
      return new Promise<Array<TagsViewsIF>>(resolve => {
        this.visitedViews = this.visitedViews.filter((v:any) => {
          return v.meta.affix || v.path === view.path
        })

        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: TagsViewsIF) {
      return new Promise<Array<RouteRecordName | null | undefined>>(resolve => {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }

        resolve([...this.cachedViews])
      })
    },
    // 删除所有
    delAllViews() {
      return new Promise<AllViewsTF>(resolve => {
        this.delAllVisitedViews()
        this.delAllCachedViews()

        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise<Array<TagsViewsIF>>(resolve => {
        const affixTags = this.visitedViews.filter((tag:any) => tag.meta.affix)
        this.visitedViews = affixTags

        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise<Array<RouteRecordName | null | undefined>>(resolve => {
        this.cachedViews = []

        resolve([...this.cachedViews])
      })
    },
    // 更新导航视图
    updateVisitedView(view: TagsViewsIF) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
