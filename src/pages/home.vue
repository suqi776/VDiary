<script setup>
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

async function fetchAndSaveImage() {
  try {
    const response = await fetch('https://dayu.qqsuu.cn/moyuribao/apis.php')
    if (!response.ok) {
      throw new Error('网络响应失败')
    }
    const blob = await response.blob()

    // 创建 FileReader 对象以便将 Blob 转换为 Base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Image = reader.result
      // 保存 Base64 图片到 localStorage
      localStorage.setItem('savedImage', base64Image)
      displayImage(base64Image)
    }
    reader.readAsDataURL(blob)
  }
  catch (error) {
    console.error('获取图片失败:', error)
  }
}

// 从 localStorage 中读取并展示图片
function loadImageFromLocalStorage() {
  const savedImage = localStorage.getItem('savedImage')
  if (savedImage) {
    displayImage(savedImage)
  }
  else {
    // 如果没有保存的图片，则获取新的图片
    fetchAndSaveImage()
  }
}

// 展示图片
function displayImage(imageUrl) {
  const imgElement = document.getElementById('image')
  imgElement.src = imageUrl
}

onMounted(() => {
  // 页面加载时尝试从 localStorage 加载图片
  loadImageFromLocalStorage()
  store.getToDayInfo()
})
</script>

<template>
  <div class="h-100vh flex justify-evenly">
    <!-- <div class="h-full w-4% flex border border-blueGray rounded-xl">
      边框
    </div> -->
    <div class="grid grid-cols-4 grid-rows-4 h-full w-full gap-4">
      <div class="row-span-3 w-full flex justify-center border border-blueGray rounded-xl p-y-20px">
        <DateFrom />
      </div>
      <div class="col-span-2 flex border border-blueGray rounded-xl">
        <StatCard />
      </div>
      <div class="row-span-3 border border-blueGray rounded-xl">
        <img id="image" alt="从API获取的图片" class="h-full w-full rounded-xl">
      </div>
      <div class="border border-blueGray rounded-xl">
        <Food />
      </div>
      <div class="border border-blueGray rounded-xl">
        <Food />
      </div>
      <div class="col-span-2 row-span-2 border border-blueGray rounded-xl">
        <WeightWeek />
      </div>
      <div class="border border-blueGray rounded-xl p-x-20px">
        <TopList />
      </div>
      <div class="border border-blueGray rounded-xl">
        <Kv />
      </div>
    </div>
  </div>
</template>
