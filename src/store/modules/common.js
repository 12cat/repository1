export default {
  state: {
    // $store.state.review.text
    uploadPath: 'http://47.92.129.232:8080/document/uploadFile',
    apiPath: 'http://47.92.129.232:8080/'
  },
  mutations: {
    // $store.commit('fun1')
    starLoading (state) {
      state.loading = true
    }
  },
  actions: {
    // $store.dispatch('fun2')
    fun2 (context) {
      console.log('run actions -> fun2')
      context.commit('fun1')
    }
  },
  getters: {
    // $store.getters.fun3
    fun3 (state) {
      return state.text
      // 值是不能直接修改的 , 需要对应的 state 发生变化才能修改
    }
  }
}
