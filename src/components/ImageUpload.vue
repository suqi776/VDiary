<script setup>
import Cropper from 'cropperjs'
import { useToast } from 'primevue/usetoast'
import VueFileUpload from 'vue-upload-component'
import { nextTick, ref, watch } from 'vue'
import api from '~/api/request'
import 'cropperjs/dist/cropper.css'

import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()
const toast = useToast()

const files = ref([])
const edit = ref(false)
const cropper = ref(null)
const uploadRef = ref(null)
const editImage = ref(null)

function showSuccess() {
  toast.add({ severity: 'success', summary: '修改成功', life: 3000 })
}

function errorSuccess() {
  toast.add({ severity: 'error', summary: '修改失败', life: 3000 })
}

// 监听 edit 状态变化
watch(edit, (value) => {
  if (value) {
    nextTick(() => {
      if (!editImage.value)
        return

      cropper.value = new Cropper(editImage.value, {
        aspectRatio: 1 / 1,
        viewMode: 1,
      })
    })
  }
  else if (cropper.value) {
    cropper.value.destroy()
    cropper.value = null
  }
})

// 保存裁剪后的图片
async function editSave() {
  edit.value = false
  const oldFile = files.value[0]

  // 获取裁剪后的图像数据
  const croppedCanvas = cropper.value.getCroppedCanvas()
  const base64ImageData = croppedCanvas.toDataURL(oldFile.type)

  // 将 base64 转换为 Blob
  const response = await fetch(base64ImageData)
  const blob = await response.blob()
  const file = new File([blob], `${Date.now()}`, { type: oldFile.type })

  // 使用 FormData 封装文件
  const formData = new FormData()
  formData.append('file', file)

  const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')

  formData.append('userId', userId) // 添加 user_id

  uploadRef.value.update(oldFile.id, {
    file,
    type: file.type,
    size: file.size,
    active: true,
  })

  // 使用 axios 上传文件
  try {
    await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 设置内容类型
      },
    })
    // 刷新pinia
    store.getToDayInfo()
    showSuccess()
  }
  catch (error) {
    console.error('失败:', error) // 错误处理
    errorSuccess()
  }
}

// 处理文件选择
function inputFile(newFile, oldFile) {
  if (newFile && !oldFile) {
    nextTick(() => {
      edit.value = true
    })
  }
  if (!newFile && oldFile) {
    edit.value = false
  }
}

// 过滤文件类型
function inputFilter(newFile, oldFile, prevent) {
  if (newFile && !oldFile) {
    if (!/\.(?:gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
      return prevent()
    }
  }

  if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
    newFile.url = ''
    const URL = window.URL || window.webkitURL
    if (URL && URL.createObjectURL) {
      newFile.url = URL.createObjectURL(newFile.file)
    }
  }
}

// 清除文件
function clearFiles() {
  uploadRef.value.clear()
  edit.value = false
}
</script>

<template>
  <Toast />
  <div class="example-avatar">
    <div v-show="uploadRef && uploadRef.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div v-show="!edit" class="avatar-upload flex flex-col items-center">
      <div class="p-2 text-center">
        <label for="avatar" class="flex flex-col items-center">
          <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" class="rounded-circle">
          <h4 class="pt-2">or<br>将文件拖放到任何位置进行上传</h4>
        </label>
      </div>
      <div class="p-2 text-center">
        <VueFileUpload
          ref="uploadRef"
          v-model="files"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          name="avatar"
          class="btn-primary btn"
          :drop="!edit"
          @input-filter="inputFilter"
          @input-file="inputFile"
        >
          上传头像
        </VueFileUpload>
      </div>
    </div>

    <div v-show="files.length && edit" class="avatar-edit">
      <div v-if="files.length" class="avatar-edit-image">
        <img ref="editImage" :src="files[0].url">
      </div>
      <div class="p-4 text-center">
        <button type="button" class="btn" @click.prevent="clearFiles">
          取消
        </button>
        <button type="submit" class="btn" @click.prevent="editSave">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.example-avatar .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
}
.example-avatar .text-center .btn {
  margin: 0 .5rem
}
.example-avatar .avatar-edit-image {
  max-width: 100%;
  max-height: 80vh;
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
