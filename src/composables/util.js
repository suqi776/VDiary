/**
 * 计算 a 相对于 b 的百分比变化
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @return {string} 返回 a 相对于 b 的百分比变化
 */
export function calculatePercentageChange(a, b) {
  if (b === 0) {
    return '-' // 处理除零错误
  }

  const difference = a - b
  const percentageChange = (difference / b) * 100

  if (difference > 0) {
    return `↗︎ ${difference.toFixed(2)}g (${percentageChange.toFixed(2)}%)` // a 比 b 大
  }
  else if (difference < 0) {
    return `↘︎ ${difference.toFixed(2)}g (${Math.abs(percentageChange).toFixed(2)}%)` // a 比 b 少
  }
  else {
    return '-' // a 和 b 相等
  }
}
