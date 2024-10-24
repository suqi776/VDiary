<script setup>
import { useToast } from 'primevue/usetoast'
import api from '~/api/request'
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()
const toast = useToast()

function showSuccess() {
  toast.add({ severity: 'success', summary: '添加成功', life: 3000 })
}

function errorSuccess() {
  toast.add({ severity: 'error', summary: '添加失败', life: 3000 })
}

const selectedDate = ref(getConvertDate(new Date()))
const food = ref('')
const weight = ref(0)
const content = ref('')

function setToday() {
  selectedDate.value = getConvertDate(new Date()) // 设置为今天
}

let userId = sessionStorage.getItem('userId')
if (userId) {
  userId = localStorage.getItem('userId')
}

function setInfo() {
  api.post('/info', {
    userId,
    selectedDate: getConvertDateTime(selectedDate.value),
    food: food.value.replaceAll(',', '，'),
    weight: weight.value,
    content: content.value,
  }).then(() => {
    showSuccess()
    // 刷新pinia
    store.getToDayInfo()
  }).catch((error) => {
    console.error('添加失败:', error)
    errorSuccess()
  })
}

// 当用户选择一个日期时，触发此方法
function onDateSelect(date) {
  api.post('/info/getInfoByDate', {
    userId,
    date: getConvertDateTime(date),
  }).then((response) => {
    food.value = response.data.food
    weight.value = response.data.weight
    content.value = response.data.content
  }).catch((error) => {
    console.error('失败:', error)
    food.value = ''
    weight.value = ''
    content.value = ''
  })
}
</script>

<template>
  <div>
    <Toast />
    <DatePicker v-model="selectedDate" class="w-full sm:w-[24rem]" showweek inline @date-select="onDateSelect">
      <template #header>
        <Button label="回到今天" text @click="setToday" />
      </template>
      <template #footer>
        <div class="flex justify-center">
          {{ getConvertDateTime(selectedDate) }}
        </div>
      </template>
    </DatePicker>

    <InputGroup class="m-y-4">
      <InputGroupAddon>
        <i class="i-carbon-chat" />
      </InputGroupAddon>
      <InputNumber id="on_weight" v-model="weight" placeholder="体重" :max-fraction-digits="2" />
      <InputGroupAddon>g</InputGroupAddon>
    </InputGroup>

    <InputGroup class="mb-4">
      <InputGroupAddon>
        <i class="i-carbon-chart-custom" />
      </InputGroupAddon>
      <InputText id="on_food" v-model="food" placeholder="饮食" />
    </InputGroup>

    <FloatLabel variant="on">
      <Textarea v-model="content" rows="2" cols="30" class="w-full" />
      <label>备注</label>
    </FloatLabel>
    <Button
      class="w-full rounded py-2"
      label="提交"
      @click="setInfo"
    />
  </div>
</template>
