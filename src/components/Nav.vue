<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

const { userAvatar } = storeToRefs(store)

const tooltip = ref('')
const tooltipX = ref(0)
const tooltipY = ref(0)

function showTooltip(text, event) {
  tooltip.value = text

  // 获取视窗的宽度和高度
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 设置提示框的初始位置
  tooltipX.value = event.clientX + 10 // 在鼠标右侧显示
  tooltipY.value = event.clientY + 10 // 在鼠标下方显示

  // 检查提示框是否超出右边界
  if (tooltipX.value + 100 > windowWidth) { // 假设提示框宽度为 100 像素
    tooltipX.value = windowWidth - 100 // 调整为右边界
  }

  // 检查提示框是否超出下边界
  if (tooltipY.value + 50 > windowHeight) { // 假设提示框高度为 30 像素
    tooltipY.value = windowHeight - 50 // 调整为下边界
  }
}

function hideTooltip() {
  tooltip.value = ''
}

function logout() {
  // 清除 SessionStorage 中的 JWT token
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('userId')

  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  // 重定向到登录页面
  window.location.href = '/'
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-900 h-60px w-100% flex justify-between rounded-2xl md:h-full md:w-16 md:flex-col">
    <!-- Logo -->
    <div class="flex items-center justify-center">
      <Avatar :image="userAvatar.avatar" class="ml-2 md:mt-2" size="large" shape="circle" />
    </div>

    <!-- Navigation Items -->
    <!-- Navigation Items -->
    <div class="flex md:w-100% md:flex-col md:gap-4 md:p-2">
      <router-link
        to="/"
        class="router-link-css"
        @mouseenter="(e) => showTooltip('首页', e)"
        @mouseleave="hideTooltip"
      >
        <div class="i-carbon:home" :class="{ active: $route.path === '/' }" />
        <span class="hidden">首页</span>
      </router-link>
      <router-link
        to="/food"
        class="m-x-2 md:m-x-0 router-link-css"
        @mouseenter="(e) => showTooltip('饮食', e)"
        @mouseleave="hideTooltip"
      >
        <div class="i-carbon:apps" :class="{ active: $route.path === '/food' }" />
        <span class="hidden">饮食</span>
      </router-link>
      <router-link
        to="/weight"
        class="router-link-css"
        @mouseenter="(e) => showTooltip('体重', e)"
        @mouseleave="hideTooltip"
      >
        <div class="i-carbon-ibm-jrs" :class="{ active: $route.path === '/weight' }" />
        <span class="hidden">体重</span>
      </router-link>
      <router-link
        to="/settings"
        class="router-link-css"
        @mouseenter="(e) => showTooltip('个人信息修改', e)"
        @mouseleave="hideTooltip"
      >
        <div class="i-carbon:settings" :class="{ active: $route.path === '/settings' }" />
        <span class="hidden">个人信息修改</span>
      </router-link>
    </div>
    <div class="flex justify-between p-r-2 md:w-100% md:flex-col md:gap-4 md:p-2">
      <div class="m-r-2 md:m-r-0 icon-btn router-link-css" @click="toggleDark()" @mouseenter="(e) => showTooltip('切换暗模式', e)" @mouseleave="hideTooltip">
        <div i-carbon-sun dark:i-carbon-moon />
        <span class="hidden">切换暗模式</span>
      </div>
      <div class="icon-btn router-link-css" @click="logout()" @mouseenter="(e) => showTooltip('退出登陆', e)" @mouseleave="hideTooltip">
        <div class="i-carbon:logout" />
        <span class="hidden">退出登陆</span>
      </div>
    </div>

    <!-- Tooltip -->
    <div v-if="tooltip" :style="{ top: `${tooltipY}px`, left: `${tooltipX}px` }" class="absolute z-999 hidden rounded bg-gray-700 p-2 text-sm text-white transition-opacity duration-300 md:block">
      {{ tooltip }}
    </div>
  </div>
</template>
