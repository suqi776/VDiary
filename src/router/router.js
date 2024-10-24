import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/pages/home.vue'),
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/hi',
    component: () => import('~/pages/Hi/hi.vue'),
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/login',
    component: () => import('~/components/Login.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (to.meta.requiresAuth && (!token || token === 'undefined')) {
    // 如果目标路由需要认证，并且用户没有token，重定向到登录页面
    next('/login')
  }
  else {
    // 否则放行
    next()
  }
})
