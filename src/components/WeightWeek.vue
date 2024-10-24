<script setup>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import { storeToRefs } from 'pinia'
import { useInfoStore } from '~/pinia/useInfoPinia'

const store = useInfoStore()

const { echartsData } = storeToRefs(store)

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

const isDark = ref(useDark())
const theme = computed(() => (isDark.value ? 'dark' : ''))

const dateDateArray = computed(() => {
  return echartsData.value.map(item => getConvertDate(item.date))
})

const dateWeightArray = computed(() => {
  return echartsData.value.map(item => item.weight)
})

const option = ref({
  backgroundColor: '',
  title: {
    text: '近期体重走势图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: dateDateArray,
    axisLabel: { interval: 0, rotate: 30 },
  },
  yAxis: {
    type: 'value',
    scale: true,
  },
  series: [
    {
      data: dateWeightArray,
      type: 'line',
      smooth: true,
    },
  ],
})
</script>

<template>
  <VChart
    class="h-full p-y-20px"
    :option="option"
    :theme="theme"
    autoresize
  />
</template>
