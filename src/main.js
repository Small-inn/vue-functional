import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store/index'
import axios from 'axios'

import '@/assets/css/index.styl'

// import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'
// NutUI.install(Vue)

import { Calendar } from '@nutui/nutui'
Calendar.install(Vue)

// 创建一个不被拦截的axios实例，用于文件上传
let instance = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' }
})
Vue.prototype.instance = instance

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(Router)

const router = new Router({
  routes,
  // 切换路由使页面滚动到原先的位置，这个功能只能在支持history.pushState的浏览器中使用
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  next()
  document.title = to.meta.title
  window.scroll(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
