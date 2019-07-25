import home from './views/Home'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/yl-calendar/index'),
    meta: {
      title: '日历'
    }
  },
  {
    path: '/carousel',
    component: () => import('./views/carousel/index.vue'),
    meta: {
      title: '轮播'
    }
  },
  {
    path: '/upload',
    component: () => import('./views/upload/index.vue'),
    meta: {
      title: '上传'
    }
  },
  {
    path: '/loadmore',
    component: () => import('./views/loadmore/index.vue'),
    meta: {
      title: '更多'
    }
  },
  {
    path: '/vuex',
    component: () => import('./views/vuex-test/index.vue'),
    meta: {
      title: '状态管理'
    }
  },
  {
    path: '/lottery',
    component: () => import('./views/lottery/index.vue'),
    meta: {
      title: '抽奖'
    }
  },
  {
    path: '/time',
    component: () => import('./views/time/index.vue'),
    meta: {
      title: '时间'
    }
  }
]
export default routes
