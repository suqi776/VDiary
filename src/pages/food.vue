<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed, ref } from 'vue'
import api from '~/api/request'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
])

const isDark = ref(useDark())
const theme = computed(() => (isDark.value ? 'dark' : ''))

const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
const getInfoFood = ref([])

const foodNameArray = computed(() => Object.keys(getInfoFood.value)) // 获取所有食物名称
const foodValueArray = computed(() => {
  return foodNameArray.value.map(food => ({
    value: getInfoFood.value[food],
    name: food,
  }))
})

api.post('/info/getInfoFoodByUserId', {
  userId,
}).then((response) => {
  getInfoFood.value = response.data.food
  // 创建一个对象来存储每种食物的数量
  const foodCount = {}

  // 遍历数组
  getInfoFood.value.forEach((item) => {
    // 如果项不为空
    if (item) {
      // 将项按逗号分隔并去除空格
      const foods = item.replace(/，/g, ',').split(',').map(food => food.trim())

      // 遍历分隔后的食物
      foods.forEach((food) => {
        // 如果该食物在对象中，数量加1；否则初始化为1
        foodCount[food] = (foodCount[food] || 0) + 1
      })
    }
  })

  // 将对象转换为数组，并按值从大到小排序
  const sortedFoodCountsArray = Object.entries(foodCount)
    .sort((a, b) => b[1] - a[1])

  // 将排序后的数组转换回对象
  const sortedFoodCounts = Object.fromEntries(sortedFoodCountsArray)

  getInfoFood.value = sortedFoodCounts
}).catch((error) => {
  console.error('失败:', error)
})

const option = ref({
  backgroundColor: '',
  title: {
    text: '饮食榜',
    left: 'center',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: foodNameArray,
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        title: '保存为图片',
      },
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: '饮食',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: foodValueArray,
    },
  ],
})
</script>

<template>
  <VChart
    class="h-full border border-blueGray rounded-xl p-2"
    :option="option"
    :theme="theme"
    autoresize
  />
</template>
