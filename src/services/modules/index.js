import 'babel-polyfill'
import vue from 'vue'
import axios from 'axios'
import user from './user'
import use from './use'
import department from './department'
import category from './category'
import document from './document'
import other from './other'

// api 为代理字段， 代理配置请查看 config/index.js  dev环境的 proxyTable
let baseUrl = vue.prototype.$store.state.common.apiPath
let obj = {}
let arr = [user, use, department, category, document, other]

arr.forEach(p => {
  obj[p.category] = {}
  p.pathList.forEach(v => {
    obj[p.category][v.key] = param => { return axios.post(baseUrl + v.url, param) }
  })
})

export default obj
