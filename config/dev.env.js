/*
 * @Description: 开发环境接口配置
 * @Author: your name
 * @Date: 2019-08-14 16:08:38
 * @LastEditTime: 2019-09-16 10:06:17
 * @LastEditors: 白青
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.0.123:8000"' // dev
  BASE_API: '"http://192.168.2.37:8000"' // qf
  // BASE_API: '"http://192.168.0.127:8000"' // sh
  // BASE_API: '"http://192.168.2.233:8000"' // pw
})
