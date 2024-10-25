<script setup>
import api from '~/api/request'

const baiduHot = ref([])
const zhihuHot = ref([])
const weiboHot = ref([])

api.post('/openapi/hot', {
  type: 'baidu',
}).then((response) => {
  baiduHot.value = response.data
}).catch((error) => {
  console.error('请求出错:', error)
})

api.post('/info/hot', {
  type: 'zhihu',
}).then((response) => {
  zhihuHot.value = response.data
}).catch((error) => {
  console.error('请求出错:', error)
})

api.post('/info/hot', {
  type: 'weibo',
}).then((response) => {
  weiboHot.value = response.data
}).catch((error) => {
  console.error('请求出错:', error)
})
</script>

<template>
  <div class="card rounded">
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader>微博热榜 <span class="text-bluegray">{{ weiboHot.update_time }}</span></AccordionHeader>
        <AccordionContent>
          <div class="overflow-auto border rounded !h-50vh">
            <div v-for="(item, index) in weiboHot.data" :key="index" class="m-1 rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
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
      <AccordionPanel value="1">
        <AccordionHeader>知乎热榜 <span class="text-bluegray">{{ zhihuHot.update_time }}</span></AccordionHeader>
        <AccordionContent>
          <div class="overflow-auto border rounded !h-50vh">
            <div v-for="(item, index) in zhihuHot.data" :key="index" class="m-1 rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
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
      <AccordionPanel value="2">
        <AccordionHeader>百度热榜 <span class="text-bluegray">{{ baiduHot.update_time }}</span></AccordionHeader>
        <AccordionContent>
          <div class="overflow-auto border rounded !h-50vh">
            <div v-for="(item, index) in baiduHot.data" :key="index" class="m-1 rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
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
    </Accordion>
  </div>
</template>
