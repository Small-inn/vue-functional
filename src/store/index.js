import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import a from './module/app'
import b from './module/moduleB'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a,
    b
  },
  getters
  // // 存储公共状态
  // state: {
  //   name: 'lx',
  //   age: 22
  // },
  // // 提交修改
  // mutations: {
  //   showPeople(state, mes) {
  //     state.name = msg
  //   }
  // },
  // actions: {

  // }
})
