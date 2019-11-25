import {getToken, getCode} from '@/utils/token'
import {Message} from 'element-ui'

import axios from 'axios'
import promise from 'es6-promise'
promise.polyfill()

const service = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 10000
})

service.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Authorization'] = getToken()
  config.headers['Actcode'] = getCode()
  return config
}, error => {
  // console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    // console.log(error)
    let msg = ''
    if (error.message.includes('timeout')) {
      msg = '请求超时了,请重新尝试！'
    } else {
      msg = '服务器出错了！'
    }
    Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
