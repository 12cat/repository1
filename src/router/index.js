import Vue from 'vue'
import Router from 'vue-router'

import Login from './login'
import Home from './home'
import Search from './search'
import Page from './page'

Vue.use(Router)

const router = new Router({
  routes: [
    Login,
    Home,
    Search,
    Page,
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || to.meta.pathName

  // 如果想去的页面，设置了meta.notAuth  就不会鉴权
  if (to.matched.some(record => record.meta.notAuth)) {
    next()
  } else {
    // console.log(`${to.fullPath} 需要鉴权`)
    next()
    // 鉴权
    // services.auth().then(
    //   res => {
    //     next()
    //   },
    //   err => {
    //     console.log('去登陆', err)
    //     next()
    //     // 跳转登录 路由
    //     // next({
    //     //   path: '/login',
    //     //   query: { redirect: to.fullPath }
    //     // })
    //     // 跳转登录页面（非vue路由页面, 开发环境的webpack server不支持与非server环境的页面交互）
    //     // window.location.href = '/login?' + to.fullPath
    //   }
    // ).catch(err => {
    //   this.$message.error(err)
    // })
  }
})
