<script setup>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { computed, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useInfoStore } from '~/pinia/useInfoPinia'

echarts.use([GridComponent, BarChart, CanvasRenderer])

const store = useInfoStore()

const { echartsWeekRangeData } = storeToRefs(store)

const isDark = ref(useDark())
const theme = computed(() => (isDark.value ? 'dark' : ''))

const dateDateArray = computed(() => {
  return echartsWeekRangeData.value.map(item => getConvertDate(item.date))
})

const dateWeightArray = computed(() => {
  return echartsWeekRangeData.value.map(item => item.weight)
})

const option = ref({
  backgroundColor: '',
  title: {
    text: '上周体重表',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: dateDateArray,
  },
  yAxis: {
    type: 'value',
    scale: true,
  },
  series: [
    {
      data: dateWeightArray,
      type: 'line',
    },
  ],
})
</script>

<template>
  <VChart
    class="h-300px p-t-20px md:h-full"
    :option="option"
    :theme="theme"
    autoresize
  />
</template>
