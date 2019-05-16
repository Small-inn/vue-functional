import home from './views/home'


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
    component: () => import(/* webpackChunkName: "about" */ './views/yl-calendar/index'),
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
    path: '/loadmore',
    component: () => import('./views/loadmore/index.vue'),
    meta: {
      title: '更多'
    }
  }
]
export default routes

