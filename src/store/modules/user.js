import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 设置token为共享状态，初始化vuex时，先从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 调用api的接口
    const result = await login(data)

    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
