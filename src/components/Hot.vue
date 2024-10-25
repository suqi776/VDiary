<script setup>
import Viewer from 'viewerjs'

const imageUrls = [
  'https://api.52vmy.cn/api/wl/moyu',
  'https://dayu.qqsuu.cn/moyuribao/apis.php',
] // 图片 URL 数组

const imageSrc = ref('') // 用于存储随机选择的图片 URL

let viewer = null // 存储 Viewer 实例

onBeforeUnmount(() => {
  // 在组件销毁时销毁 Viewer 实例
  if (viewer) {
    viewer.destroy()
  }
})

async function openViewer() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length)
  imageSrc.value = imageUrls[randomIndex]

  // 创建新的 Viewer 实例
  nextTick(() => {
    // 如果已经有 Viewer 实例，则先销毁
    if (viewer) {
      viewer.destroy()
    }

    const imageElement = document.getElementById('image')
    // 创建新的 Viewer 实例
    viewer = new Viewer(imageElement, {
      inline: false, // 不使用内联模式，强制弹出
      navbar: true, // 显示导航
      title: false, // 隐藏标题
      toolbar: true, // 显示工具栏
      zoomable: true, // 支持缩放
      rotatable: true, // 支持旋转
      scalable: true, // 支持缩放
      transition: true, // 启用过渡效果
    })
    // 显示图片
    viewer.show()
  })
}
</script>

<template>
  <div class="p-10px">
    <HotApi />
    <div class="p-y-10px">
      <img id="image" :src="imageSrc" style="display: none;">
      <Button class="w-full" label="获取摸鱼日报" @click="openViewer" />
    </div>
  </div>
</template>

<style scoped>

</style>
