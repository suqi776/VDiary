<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useInfoStore } from '~/pinia/useInfoPinia'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const store = useInfoStore()

const { getInfoFood } = storeToRefs(store)

const foodNameArray = computed(() => Object.keys(getInfoFood.value)) // 获取所有食物名称
const foodValueArray = computed(() => {
  return foodNameArray.value.map(food => ({
    value: getInfoFood.value[food],
    name: food,
  }))
})

const isDark = ref(useDark())
const theme = computed(() => (isDark.value ? 'dark' : ''))

const option = ref({
  backgroundColor: '',
  title: {
    text: '饮食top榜-5th',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: foodNameArray,
  },
  series: [
    {
      name: '饮食',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: foodValueArray,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
</script>

<template>
  <VChart
    class="h-300px p-y-20px md:h-full"
    :option="option"
    :theme="theme"
    autoresize
  />
</template>
