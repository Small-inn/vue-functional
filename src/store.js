import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储公共状态
  state: {
    name: 'lx',
    age: 22
  },
  // 提交修改
  mutations: {
    showPeople (state, msg) {
      state.name = msg
    }
  },
  actions: {

  }
})
