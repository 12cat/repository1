import axios from 'axios'
import Vue from 'vue'

axios.defaults.withCredentials = true
axios.defaults.timeout = 99999
axios({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器，可以自定义 预处理内容
axios.interceptors.request.use(request => {
  return request
}, err => {
  Vue.prototype.$message.error('ERROR: ' + err.toString())
  return Promise.reject(err)
})

// 影响拦截器，可以自定义 预处理内容
axios.interceptors.response.use(response => {
  // 接口参数，权限问题，统一提示，然后错误（业务模块选择性处理）
  if (response.data.success === 1) {
    return response.data.data
  } else if (response.data.errorCode === 3) {
    location.href = '/#/login'
  } else {
    Vue.prototype.$message.error(response.data.errorMsg)
    return response.data
  }
}, err => {
  // 网络问题，通过2种方式提示，业务不处理
  Vue.prototype.$message.error('ERROR: ' + err.toString())
  return Promise.reject(err)
})
