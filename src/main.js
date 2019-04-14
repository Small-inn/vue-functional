import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

import '@/assets/css/index.styl'

// import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'
// NutUI.install(Vue)

import { Calendar } from '@nutui/nutui'
Calendar.install(Vue)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue

Vue.use(Router)

const router = new Router({
  routes
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
