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
  NProgress.start()
  return config
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

// 响应拦截器 - 请求结束时隐藏进度条
api.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

// request.js
export default api
