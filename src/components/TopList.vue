<script setup>
import { storeToRefs } from 'pinia'
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

const { userInfo } = storeToRefs(store)
</script>

<template>
  <div>
    <h2 class="flex justify-center p-y-10px text-4xl font-extrabold leading-tight">
      我和我的小伙伴
    </h2>
    <DataTable :value="userInfo" size="small" striped-rows class="flex justify-center">
      <Column field="name" header="昵称" class="!text-center" />
      <Column field="target" header="目标体重" class="!text-center" />
      <Column field="latestWeight" header="当前体重" class="!text-center" />
      <!-- <Column field="latestDate" header="latestDate" /> -->
    </DataTable>
  </div>
</template>

<style scoped>

</style>
