import { resetState } from '@/utils'
import _ from 'lodash'

const defaults = () => ({
  loading: false,
  nav_visible: false,
  alert_visible: false,
  forgot_email: '',
  alert: {
    header: '',
    message: '',
    // template: null,
    actions: {},
    button_labels: []
  }
})

export default {
  defaults,
  state: defaults(),
  getters: {
    'app:loading': state => {
      return state.loading
    },
    'app:nav_visible': state => {
      return state.nav_visible
    },
    'app:alert_visible': state => {
      return state.alert_visible
    },
    'app:alert': state => {
      return state.alert
    },
    'app:forgot_email': state => {
      return state.forgot_email
    }
  },
  mutations: {
    RESET(state) {
      resetState(state, defaults())
    },
    LOADING_BEGIN(state) {
      state.loading = true
    },
    LOADING_END(state) {
      state.loading = false
    },
    NAV_TOGGLE(state) {
      state.nav_visible = !state.nav_visible
    },
    NAV_SHOW(state) {
      state.nav_visible = true
    },
    NAV_HIDE(state) {
      state.nav_visible = false
    },
    ALERT_SHOW(state, alert) {
      state.alert_visible = true
      _.extend(state.alert, alert)
    },
    ALERT_HIDE(state) {
      state.alert_visible = false
      state.alert = defaults().alert
    },
    SET_FORGOT_EMAIL(state, email) {
      state.forgot_email = email
    }
  },
  actions: {
    reset({ commit }) {
      commit('RESET')
    },
    loading_begin({ commit }) {
      commit('LOADING_BEGIN')
    },
    loading_end({ commit }) {
      commit('LOADING_END')
    },
    nav_toggle({ commit }) {
      commit('NAV_TOGGLE')
    },
    nav_show({ commit }) {
      commit('NAV_SHOW')
    },
    nav_hide({ commit }) {
      commit('NAV_HIDE')
    },
    alert_show({ commit }, opts) {
      commit('ALERT_SHOW', opts)
    },
    alert_hide({ commit }) {
      commit('ALERT_HIDE')
    },
    set_forgot_email({ commit }, email) {
      commit('SET_FORGOT_EMAIL', email)
    }
  }
}
