import { defineStore } from 'pinia'
import api from '~/api/request'
import { getConvertDate, getConvertDateTime, getDateSubtract, getLastWeekRange } from '~/composables/Date'

// 获取今日info信息
export const useInfoStore = defineStore('info', () => {
  let userId = sessionStorage.getItem('userId')
  if (userId) {
    userId = localStorage.getItem('userId')
  }

  const toDayInfo = ref([])
  const yesterDayInfo = ref([])

  const echartsData = ref([])
  const echartsWeekRangeData = ref([])

  const getInfoFood = ref([])
  const targetWeight = ref([])
  const userInfo = ref([])

  async function getToDayInfo() {
    api.post('/info/getInfoByDate', {
      userId,
      date: getConvertDateTime(getConvertDate(new Date())),
    }).then((response) => {
      toDayInfo.value = response.data
    }).catch((error) => {
      console.error('失败:', error)
    })

    api.post('/info/getInfoByDate', {
      userId,
      date: getConvertDateTime(getDateSubtract(getConvertDate(new Date()), 1, 'day')),
    }).then((response) => {
      yesterDayInfo.value = response.data
    }).catch((error) => {
      console.error('失败:', error)
    })

    // 当前7天的
    api.post('/info/getInfoByDateRange', {
      userId,
      fromDate: getConvertDateTime(getDateSubtract(getConvertDate(new Date()), 7, 'day')),
      toDate: getConvertDateTime(getConvertDate(new Date())),
    }).then((response) => {
      echartsData.value = response.data
    }).catch((error) => {
      console.error('失败:', error)
    })

    // 上周的 getLastWeekRange(getConvertDate(new Date()).split(" ~ ")[0]
    api.post('/info/getInfoByDateRange', {
      userId,
      fromDate: getConvertDateTime(getLastWeekRange(getConvertDate(new Date())).split(' ~ ')[0]),
      toDate: getConvertDateTime(getLastWeekRange(getConvertDate(new Date())).split(' ~ ')[1]),
    }).then((response) => {
      echartsWeekRangeData.value = response.data
    }).catch((error) => {
      console.error('失败:', error)
    })

    // 食物top
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
        .slice(0, 5) // 只保留前 5 个

      // 将排序后的数组转换回对象
      const sortedFoodCounts = Object.fromEntries(sortedFoodCountsArray)

      getInfoFood.value = sortedFoodCounts
    }).catch((error) => {
      console.error('失败:', error)
    })

    api.post('/info/getTargetWeight', {
      userId,
    }).then((response) => {
      targetWeight.value = response.data
    }).catch((error) => {
      console.error('失败:', error)
    })

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

  return { toDayInfo, yesterDayInfo, getToDayInfo, echartsData, echartsWeekRangeData, getInfoFood, targetWeight, userInfo }
})
