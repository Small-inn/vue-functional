const app = {
  state: {
    username: '',
    role: '',
    id: 0,
    shopCount: 0
  },
  mutations: {
    // mutations类似于组件中的事件，接收state作为参数
    ADD_COUNT(state) {
      state.shopCount++ 
      console.log(state.shopCount)
    },
    SELECT_DATA(state, payload) {
      const { username, role, id } = payload
      state.username = username
      state.role = role
      state.id = id
    }
  },
  action: {
    async GET_USERINFO({commit}, para) {
      let res = await fetch.login(para)
      if (res.code === 200) {
        commit('ADD_COUNT')
      }
    },
    async GET_DATA({commit}, para) {
      let res = await fetch.getData(para)
      commit('SELECT_DATA', res.data)
    }
  }
}
export default app
