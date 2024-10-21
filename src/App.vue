<script setup>
import api from './api/request'

const info = ref([])

onMounted(() => {
  getInfo()
})

function getInfo() {
  api.get('/one').then((response) => {
    info.value = response.data
  }).catch((error) => {
    console.error(error)
  })
}
</script>

<template>
  <div flex="~ col items-center" m-auto p-y-10>
    <router-view />
    <Footer />
    <Button label="Check" icon="pi pi-check" />

    <Button
      label="Search"
      icon="pi pi-search"
      unstyled
      pt:root="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2"
      pt:label="text-white font-bold text-lg"
      pt:icon="text-white text-xl"
    />

    <div class="card flex justify-center">
      <DatePicker v-model="date" show-week inline class="w-full sm:w-[30rem]" />
    </div>
    <div v-for="item in info" :key="item._id">
      <p>Name: {{ item.name }}</p>
      <p>Type: {{ item.type }}</p>
    </div>
  </div>
</template>
