import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './module/app'
import other from './module/other'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    other
  },
  getters
})
