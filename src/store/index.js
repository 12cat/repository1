import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common.js'
import classpage from './modules/classpage.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    classpage
  }
})

// 方便调用
Vue.prototype.$store = store

export default store
