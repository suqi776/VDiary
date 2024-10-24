// 日期工具类
import dayjs from 'dayjs'

/**
 * 校检日期格式是否为YYYY-MM-DD这种格式
 * @param date
 * @return {boolean}
 */
export function isValidDate(date) {
  return dayjs(date, 'YYYY-MM-DD', true).isValid()
}

/**
 * 校检日期格式是否为YYYY-MM-DD HH:mm:ss这种格式
 * @param date
 * @return {boolean}
 */
export function isValidDateTime(date) {
  return dayjs(date, 'YYYY-MM-DD HH:mm:ss', true).isValid()
}

/**
 * 获取当前日期年月日,时间格式为YYYY-MM-DD
 * @return {string}
 */
export function getCurrentDate() {
  return dayjs(new Date()).format('YYYY-MM-DD')
}

/**
 * 获取当前日期年月日时分秒,时间格式为YYYY-MM-DD HH:mm:ss(24小时制,如果hh为小写表示为12小时制)
 * @return {string}
 */
export function getCurrentDateTime() {
  return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 将传过来的日期转换为YYYY-MM-DD这种格式
 * @param date 为传过来的日期
 * @return {string}
 */
export function getConvertDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

/**
 * 将传过来的日期转换为YYYY-MM-DD HH:mm:ss这种格式
 * @param date 为传过来的日期
 * @return {string}
 */
export function getConvertDateTime(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 将传过来的日期加X日期且时间格式为YYYY-MM-DD这种格式,如:getXAfterDate('2023-11-11',1,'day'),结果为2023-11-12
 * @param date 为传过来的日期
 * @param num 在当前日期加num,类型为int
 * @param dateType 为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
 * @return {string}
 */
export function getXAfterDate(date, num, dateType) {
  return dayjs(date).add(num, dateType).format('YYYY-MM-DD')
}

/**
 * 将传过来的日期加X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXAfterDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-12 10:23:45
 * @param date 为传过来的日期
 * @param num 在当前日期加num,类型为int
 * @param dateType  为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
 * @return {string}
 */
export function getXAfterDateTime(date, num, dateType) {
  return dayjs(date).add(num, dateType).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD这种格式,如:getXBeforeDate('2023-11-11',1,'day'),结果为2023-11-10
 * @param date 为传过来的日期
 * @param num 在当前日期加num,类型为int
 * @param dateType  为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
 * @return {string}
 */
export function getXBeforeDate(date, num, dateType) {
  return dayjs(date).subtract(num, dateType).format('YYYY-MM-DD')
}

/**
 * 将传过来的日期减去X日期且时间格式为YYYY-MM-DD HH:mm:ss这种格式,如:getXBeforeDateTime('2023-11-11 10:23:45',1,'day'),结果为2023-11-10 10:23:45
 * @param date 为传过来的日期
 * @param num 在当前日期加day,类型为int
 * @param dateType  为要加的日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
 * @return {string}
 */
export function getXBeforeDateTime(date, num, dateType) {
  return dayjs(date).subtract(num, dateType).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 计算2个日期之间的差值
 * @param startDate 开始日期
 * @param endDate 结束日期,结束日期要比开始日期大
 * @param dateType 日期类型,有如下类型:'minute','hour','day','week','month','year'这六种类型
 * @return {number}
 */
export function getDateDiff(startDate, endDate, dateType) {
  return dayjs(endDate).diff(dayjs(startDate), dateType)
}

/**
 * 判断date1是否在date2之前,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
 * @param date1
 * @param date2
 * @return {boolean}
 */
export function isBefore(date1, date2) {
  return dayjs(date1).isBefore(dayjs(date2))
}

/**
 * 判断date1是否在date2之后,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为true
 * @param date1
 * @param date2
 * @return {boolean}
 */
export function isAfter(date1, date2) {
  return dayjs(date1).isAfter(dayjs(date2))
}

/**
 * 判断date1是否与date2相同,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
 * @param date1
 * @param date2
 * @return {boolean}
 */
export function isSame(date1, date2) {
  return dayjs(date1).isSame(dayjs(date2))
}

/**
 * 判断date1是否等于或者在date2之前,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为false
 * @param date1
 * @param date2
 * @return {boolean}
 */
export function isSameOrBefore(date1, date2) {
  return dayjs(date1).isSameOrBefore(dayjs(date2))
}

/**
 * 判断date1是否等于或者在date2之后,比如:date1:2023-01-01 13:30:23,date2:2022-12-01 13:30:23,结果为true
 * @param date1
 * @param date2
 * @return {boolean}
 */
export function isSameOrAfter(date1, date2) {
  return dayjs(date1).isSameOrAfter(dayjs(date2))
}

/**
 * 判断betweenDate日期是否在startDate开始日期和endDate结束日期之间
 * @param startDate 开始日期
 * @param betweenDate 中间日期
 * @param endDate 结束日期要比开始日期大
 * @return {boolean}
 */
export function isBetween(startDate, betweenDate, endDate) {
  return dayjs(startDate).isBetween(betweenDate, dayjs(endDate))
}

/**
 * 将传过来的日期转为当年的1月1号或者当月的1号或者当周的周一
 * @param date 传过来日期
 * @param dateType 日期类型,为:year,month,week这3种
 * @return {string}
 */
export function getEarlyDaysDate(date, dateType) {
  return dayjs(date).startOf(dateType).format('YYYY-MM-DD')
}

/**
 * 将传过来的日期转为当年的12月31号或者当月的最后一天或者当周的周日
 * @param date 传过来日期
 * @param dateType 日期类型,为:year,month,week这3种
 * @return {string}
 */
export function getLastDaysDate(date, dateType) {
  return dayjs(date).endOf(dateType).format('YYYY-MM-DD')
}

/**
 * 获取2个日期之间的所有日期,包括开始日期和结束日期,如:getIntermediateDate('2023-12-01','2023-12-15',1,'day'))
 * @param startDate 开始日期
 * @param endDate 结束日期要大于开始日期
 * @param num 开始日期上加num,int类型,如果dateType为day,num为1那么就是在开始日期上加一天
 * @param dateType 日期类型,类型如下:'minute','hour','day','week','month','year'这六种类型
 * @return {*[]}
 */
export function getIntermediateDate(startDate, endDate, num, dateType) {
  // 声明一个数组用来存放所有日期,默认把开始日期放进数组里面,不然少一个开始日期数据
  const daysArray = [startDate]
  // 判断startDate是否在endDate之前
  while (isBefore(startDate, endDate)) {
    // 如果开始日期在结束日期之前,那么就将开始日期加num,并重新赋值给开始日期,不然会死循环
    startDate = getXAfterDate(startDate, num, dateType)
    // 将计算后的日期放进数组里面
    daysArray.push(startDate)
  }
  return daysArray
}

/**
 * 在给定日期上添加指定数量的时间单位
 * @param date  要操作的日期
 * @param amount 要添加的数量
 * @param unit 时间单位，例如 'day'、'month'、'year' 等
 * @return {string} 添加后的日期，格式为 YYYY-MM-DD HH:mm:ss
 */
export function getDateAdd(date, amount, unit) {
  return dayjs(date).add(amount, unit).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 在给定日期上减少指定数量的时间单位
 * @param date  要操作的日期
 * @param amount 要减少的数量
 * @param unit 时间单位，例如 'day'、'month'、'year' 等
 * @return {string} 减少后的日期，格式为 YYYY-MM-DD HH:mm:ss
 */
export function getDateSubtract(date, amount, unit) {
  return dayjs(date).subtract(amount, unit).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 获取上周的日期范围
 * @param date 输入的日期
 * @return {string} 返回格式为 "YYYY-MM-DD ~ YYYY-MM-DD"
 */
export function getLastWeekRange(date) {
  const inputDate = dayjs(date)

  // 获取输入日期的上周一
  const startOfLastWeek = inputDate.subtract(1, 'week').startOf('week').add(1, 'day')

  // 获取输入日期的上周日
  const endOfLastWeek = inputDate.subtract(1, 'week').endOf('week').add(1, 'day')

  return `${startOfLastWeek.format('YYYY-MM-DD')} ~ ${endOfLastWeek.format('YYYY-MM-DD')}`
}
