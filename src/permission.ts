import router from '@/router/index'

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (to.path !== '/login' && !username) next({ path: '/login' })
  else next()
})

