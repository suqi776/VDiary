<script setup>
import { storeToRefs } from 'pinia'
import api from '~/api/request'
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

const { userInfo } = storeToRefs(store)

const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')

// 定义一个 ref 来存储定时器的 ID
const intervalId = ref(null)

// 每隔一秒检查 getAllUserInfo
function fetchUserInfo() {
  api.post('/info/getAllUserInfo', {
    userId,
  }).then((response) => {
    const users = response.data.map((user) => {
      return {
        ...user,
        latestDate: user.latestDate ? getConvertDate(user.latestDate) : null, // 格式化日期
      }
    })
    userInfo.value = users // 将格式化后的用户信息数组赋值给 userInfo
  }).catch((error) => {
    console.error('失败:', error)
  })
}

// 启动定时器
intervalId.value = setInterval(fetchUserInfo, 2000)

// 组件卸载前清理定时器
onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})
</script>

<template>
  <div>
    <h2 class="flex justify-center p-y-10px text-4xl font-extrabold leading-tight">
      我和我的小伙伴
    </h2>
    <DataTable :value="userInfo" size="small" striped-rows class="flex justify-center">
      <Column header="头像">
        <template #body="slotProps">
          <Avatar :image="slotProps.data.avatar" shape="circle" />
        </template>
      </Column>
      <Column field="name" header="昵称" class="!text-center" />
      <Column field="target" header="目标体重" class="!text-center" />
      <Column field="latestWeight" header="当前体重" class="!text-center" />
      <Column field="difference" header="目标还差" class="!text-center" />
    </DataTable>
  </div>
</template>

<style scoped>

</style>
