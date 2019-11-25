import {getUserInfo} from '@/api/auth'

export function loginRequired () {
  getUserInfo().then((response) => {
    var data = response.data
    if (data.success) {
    } else {
      this.$router.push({ path: '/login' })
      // vm.$message.error({message: '请登录'})
    }
  }).catch((error) => {
    this.loading = false
    console.log(error)
  })
}
