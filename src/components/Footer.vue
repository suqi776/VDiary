<script setup lang="js">
function logout() {
  // 清除 SessionStorage 中的 JWT token
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('userId')

  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  // 重定向到登录页面
  window.location.href = '/login'
}
</script>

<template>
  <div class="flex">
    <button icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon h-1.2rem w-1.2rem />
    </button>
    <button icon-btn @click="logout()">
      <div class="i-carbon:logout h-1.2rem w-1.2rem" />
    </button>
  </div>
</template>
