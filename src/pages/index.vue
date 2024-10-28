<script setup lang='ts'>

</script>

<template>
  <div class="m-5 box-border flex flex-col justify-between md:m-0 md:h-100vh md:flex-row">
    <!-- 左侧的导航栏，适用于中大屏幕 -->
    <div class="flex border border-blueGray rounded-xl md:m-r-2 md:max-w-70px md:min-w-70px">
      <Nav />
    </div>

    <router-view />
  </div>
</template>

<style scoped>

</style>
