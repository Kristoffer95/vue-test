import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    names: [] as Array<object>
  },
  mutations: {
    SAVE_FULLNAME (state, value: object) {
      state.names.push(value)
    },
    UPDATE_FULLNAME (state, value: any ) {
      state.names.splice(value.index, 1, value.fullName)
    },
    REMOVE_FULLNAME (state, value: number) {
      state.names.splice(value, 1)
    }
  },
  actions: {
    saveFullName ({ commit }, value) {
      commit('SAVE_FULLNAME', value)
    },
    updateFullName({ commit }, data) {
      commit('UPDATE_FULLNAME', data)
    },
    removeFullName({ commit }, value: number) {
      commit('REMOVE_FULLNAME', value)
    }
  },
  modules: {
  }
})
