/*
 * @Description: api接口配置文件
 * @Author: 白青
 * @Date: 2019-08-29 11:23:15
 * @LastEditTime: 2019-09-12 18:04:47
 * @LastEditors: 白青
 */
'use strict'
let BASE_API = '"http://dev.goumee.com"'
if (process.env.BUILD_TYPE === 'production')  {
  BASE_API = '"https://data.goumee.com"'
} else if (process.env.BUILD_TYPE === 'test') {
  BASE_API = '"http://dev.goumee.com"'
}

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: BASE_API
  // BASE_API: '"https://data.goumee.com"'
}
