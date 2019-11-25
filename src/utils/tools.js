/*
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-11-25 10:40:10
 * @LastEditTime: 2019-11-25 11:31:10
 * @LastEditors: 白青
 */
/* eslint-disable */
import { getToken } from '@/utils/token'
// 格式化时间
export function formatTime(time, fmt = 'yyyy-MM-dd') {
  // time是秒
  var date = new Date(time)
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

export function getPreMonth(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth()
  if (month === 0) {
    year = year - 1
    month = 12
  }
  return new Date(`${year}/${month}/1`)
}

export function fixFileToken(url) {
  return `${url}?Authorization=${getToken()}`
}
