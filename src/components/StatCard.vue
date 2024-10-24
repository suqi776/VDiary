<script setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useInfoStore } from '~/pinia/useInfoPinia'
import { calculatePercentageChange } from '~/composables/util'
import api from '~/api/request'

const visible = ref(false)

const store = useInfoStore()
const toast = useToast()

const { toDayInfo, yesterDayInfo, targetWeight } = storeToRefs(store)

const relatively = computed(() => {
  return calculatePercentageChange(toDayInfo.value.weight, yesterDayInfo.value.weight)
})

const toRelatively = computed(() => {
  return calculatePercentageChange(targetWeight.value.target, toDayInfo.value.weight)
})

const textClass = computed(() => {
  return relatively.value.includes('-') ? 'text-emerald' : 'text-red'
})

const mTextClass = computed(() => {
  return toRelatively.value.includes('-') ? 'text-emerald' : 'text-red'
})

const updateTargetWeight = ref()

let userId = sessionStorage.getItem('userId')
if (userId) {
  userId = localStorage.getItem('userId')
}

function showSuccess() {
  toast.add({ severity: 'success', summary: '添加成功', life: 3000 })
}

function errorSuccess() {
  toast.add({ severity: 'error', summary: '添加失败', life: 3000 })
}

function updateWeight() {
  api.post('/info/setTargetWeight', {
    userId,
    targetWeight: updateTargetWeight.value,
  }).then(() => {
    showSuccess()
    // 刷新pinia
    store.getToDayInfo()
  }).catch((error) => {
    console.error('error:', error)
    errorSuccess()
  })
  visible.value = false
}
</script>

<template>
  <Toast />
  <div class="w-full flex shadow">
    <div class="stat place-items-center p-y-30px">
      <div class="stat-title">
        昨天体重
      </div>
      <div class="stat-value">
        {{ yesterDayInfo.weight }}g
      </div>
      <div class="stat-desc">
        -
      </div>
    </div>

    <div class="stat place-items-center border-x border-slate-200 p-y-30px dark:border-slate-800">
      <div class="stat-title">
        今日体重
      </div>
      <div class="stat-value text-pink-600 dark:text-pink-300">
        {{ toDayInfo.weight }}g
      </div>
      <div :class="textClass">
        {{ relatively }}
      </div>
    </div>

    <div class="stat place-items-center p-y-30px">
      <div class="stat-title">
        目标体重
      </div>
      <div class="stat-value flex items-end">
        {{ targetWeight.target }}g<div class="i-carbon:edit ml-1 h-1.2rem w-1.2rem icon-btn" @click="visible = true" />
      </div>
      <div :class="mTextClass">
        {{ toRelatively }}
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal header="目标体重修改" :style="{ width: '25rem' }">
    <div class="mb-4 flex items-center gap-4">
      <label for="updateTargetWeight" class="w-24 font-semibold">目标体重</label>
      <InputText id="updateTargetWeight" v-model="updateTargetWeight" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="visible = false" />
      <Button type="button" label="确认" @click="updateWeight()" />
    </div>
  </Dialog>
</template>

<style scoped>

</style>
