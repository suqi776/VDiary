import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
    meta: { requiresAuth: true }, // 需要登录
    children: [
      {
        path: '', // 子路由的路径应相对于父路由
        component: () => import('~/pages/home.vue'),
        meta: { requiresAuth: true }, // 需要登录
      },
      {
        path: 'weight', // 子路由的路径应相对于父路由
        component: () => import('~/pages/weight.vue'),
        meta: { requiresAuth: true }, // 需要登录
      },
      {
        path: 'food', // 子路由的路径应相对于父路由
        component: () => import('~/pages/food.vue'),
        meta: { requiresAuth: true }, // 需要登录
      },
      {
        path: 'hi', // 子路由的路径应相对于父路由
        component: () => import('~/pages/Hi/hi.vue'),
        meta: { requiresAuth: true }, // 需要登录
      },
      // 可以在这里添加更多子路由
    ],
  },
  {
    path: '/index',
    redirect: '/', // 重定向到根路径
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
