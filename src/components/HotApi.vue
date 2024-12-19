<script setup>
import api from '~/api/request'

const props = defineProps({
  type: String,
  name: String,
  number: String,
})

const arrayHot = ref([])

async function fetchHotData(type, refVar) {
  try {
    const response = await api.post('/openapi/hot', { type })
    refVar.value = response.data
  }
  catch (error) {
    console.error('请求出错:', error)
    // 等待 3 秒后重新请求
    setTimeout(() => fetchHotData(type, refVar), 3000)
  }
}

// 发起请求
fetchHotData(props.type, arrayHot)
</script>

<template>
  <AccordionPanel :value="number">
    <AccordionHeader>{{ name }} <span class="text-bluegray">{{ arrayHot.update_time }}</span></AccordionHeader>
    <AccordionContent>
      <div class="overflow-auto border rounded !h-50vh">
        <div v-for="(item, i) in arrayHot.data" :key="i" class="m-1 rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <a :href="item.url" target="_blank" class="flex items-center space-x-4">
            <!-- <img :src="item.pic" alt="Image" class="h-20 w-20 rounded-md object-cover"> -->
            <div>
              <h3 class="max-w-50 truncate text-sm font-semibold" title="{{ item.title }}">{{ item.title }}</h3>
              <!-- <p class="mt-1 text-sm text-gray-500">{{ item.desc || '暂无描述' }}</p> -->
              <p class="mt-2 text-xs text-blue-600 hover:underline">阅读更多</p>
            </div>
          </a>
        </div>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
