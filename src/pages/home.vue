<script setup>
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

onMounted(() => {
  store.getToDayInfo()
})
</script>

<template>
  <!-- 主要内容区域 -->
  <div class="grid grid-cols-1 grid-rows-4 w-full gap-4 md:grid-cols-4 md:h-full">
    <div class="col-span-1 block flex border border-blueGray rounded-xl md:col-span-2 md:hidden">
      <StatCard />
    </div>
    <div class="row-span-3 w-full flex justify-center border border-blueGray rounded-xl py-5">
      <DateFrom />
    </div>
    <div class="col-span-1 hidden border border-blueGray rounded-xl md:col-span-2 md:block md:flex">
      <StatCard />
    </div>
    <div class="col-span-1 row-span-4 overflow-scroll border border-blueGray rounded-xl md:col-span-1">
      <Hot />
    </div>
    <div class="border border-blueGray rounded-xl">
      <Food />
    </div>
    <div class="border border-blueGray rounded-xl">
      <Kv />
    </div>
    <div class="col-span-1 row-span-2 border border-blueGray rounded-xl md:col-span-2">
      <WeightWeek />
    </div>
    <div class="border border-blueGray rounded-xl px-4">
      <TopList />
    </div>
  </div>
</template>
