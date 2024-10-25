import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// request.js
// 创建新的axios实例
const api = axios.create({
  // 环境变量，需要在.env文件中配置
  baseURL: '/api',
  // 超时时间暂定5s
  timeout: 5000,
})

// 请求拦截器 - 请求开始时显示进度条
api.interceptors.request.use((config) => {
  if (config.url !== '/info/getAllUserInfo') {
    NProgress.start()
  }
  let token = sessionStorage.getItem('token')
  if (token) {
    token = localStorage.getItem('token')
  }
  // 如果请求不是登录请求，添加Authorization头
  if (token && config.url !== '/login') {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

// 响应拦截器 - 请求结束时隐藏进度条
api.interceptors.response.use((response) => {
  if (response.url !== '/info/getAllUserInfo') {
    NProgress.done()
  }
  return response
}, (error) => {
  NProgress.done()
  if (error.response && error.response.status === 401 && error.config.url !== '/login') {
    console.error('令牌已过期，请重新登录')
    // 清除 SessionStorage 中的 JWT token
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 跳转到登录页面
    window.location.href = '/login'
  }
  else {
    console.error('请求失败:', error)
  }
  return Promise.reject(error)
})

// request.js
export default api
