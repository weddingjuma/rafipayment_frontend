import Vue from 'vue'
import Vuex from 'vuex'
import { resetAllStates } from '../utils'

import session from './modules/session'
import main from './modules/main'

const modules = {
  session,
  main
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  mutations: {
    RESET_ALL(state) {
      resetAllStates(state, modules)
    }
  },
  actions: {
    reset_all({ commit }) {
      commit('RESET_ALL')
    }
  }
})
