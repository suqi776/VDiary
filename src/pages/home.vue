<script setup>
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

onMounted(() => {
  store.getToDayInfo()
})
</script>

<template>
  <div class="box-border h-100vh flex justify-between">
    <!-- <div class="m-r-10px h-full w-4% flex border border-blueGray rounded-xl">
      边框
    </div> -->
    <div class="grid grid-cols-4 grid-rows-4 h-full w-full gap-4">
      <div class="row-span-3 w-full flex justify-center border border-blueGray rounded-xl p-y-20px">
        <DateFrom />
      </div>
      <div class="col-span-2 flex border border-blueGray rounded-xl">
        <StatCard />
      </div>
      <div class="row-span-4 border border-blueGray rounded-xl">
        <Hot />
      </div>
      <div class="border border-blueGray rounded-xl">
        <Food />
      </div>
      <div class="border border-blueGray rounded-xl">
        <Kv />
      </div>
      <div class="col-span-2 row-span-2 border border-blueGray rounded-xl">
        <WeightWeek />
      </div>
      <div class="border border-blueGray rounded-xl p-x-20px">
        <TopList />
      </div>
    </div>
  </div>
</template>
