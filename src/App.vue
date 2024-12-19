<script setup lang="ts">
const isDark = useDark()

// 动态设置 theme-color
function setThemeColor(isDark: boolean) {
  const themeColor = isDark ? '#000000' : '#ffffff' // 深色和浅色主题颜色
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
}

// 初始设置
onMounted(() => {
  setThemeColor(isDark.value)
})

// 监听主题切换
watch(isDark, (newVal) => {
  setThemeColor(newVal)
})
</script>

<template>
  <router-view />
  <!-- <Footer class="pos-fixed bottom-6 right-6 z-999" /> -->
</template>
