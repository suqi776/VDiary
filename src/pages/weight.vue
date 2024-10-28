<script setup>
import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import api from '~/api/request'

const echartsData = ref([])

const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')

api.post('/info/getInfoByAllWeight', {
  userId,
}).then((response) => {
  echartsData.value = response.data
}).catch((error) => {
  console.error('失败:', error)
})

echarts.use([GridComponent, LineChart, BarChart, CanvasRenderer, UniversalTransition, TooltipComponent, TitleComponent, ToolboxComponent])

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
    text: '体重走势图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  toolbox: {
    show: true,
    feature: {
      magicType: {
        type: ['line', 'bar'],
        title: {
          line: '折线图',
          bar: '柱状图',
        },
      },
      saveAsImage: {
        title: '保存为图片',
      },
    },
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
    class="h-300px border border-blueGray rounded-xl p-2 md:h-full"
    :option="option"
    :theme="theme"
    autoresize
  />
</template>
