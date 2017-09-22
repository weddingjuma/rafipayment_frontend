import _ from 'lodash'

const defaults = () => ({
  logged_in: false,
  user: null,
  actions_required: [],
  funding_sources: [],
  primary_funding_source: null
})

const getDwollaAccountPath = (user) => {
  let path = 'user'
  if (user.role === 'admin') path += '.company'
  path += '.dwolla'
  return path
}

export default {
  defaults,
  state: defaults(),
  getters: {
    'session:auth_token': state => {
      return _.get(state, 'user.session.authorization_token')
    },
    'session:logged_in': state => {
      return state.logged_in
    },
    'session:user': state => {
      return _.get(state, 'user')
    },
    'session:role': state => {
      return _.get(state, 'user.role')
    },
    'session:dwolla': state => {
      if (!state.user) return null
      const path = getDwollaAccountPath(state.user)
      return _.get(state, path)
    },
    // 'session:isSuperAdmin': state => {
    //   return _.get(state, 'user.role') === 'superadmin'
    // },
    // 'session:isAdmin': state => {
    //   return _.get(state, 'user.role') === 'admin'
    // },
    // 'session:isManager': state => {
    //   return _.get(state, 'user.role') === 'manager'
    // },
    // 'session:isTenant': state => {
    //   return _.get(state, 'user.role') === 'tenant'
    // },
    'session:actions_required': state => {
      return _.get(state, 'actions_required')
    },
    'session:funding_sources': state => {
      return _.get(state, 'funding_sources')
    },
    'session:primary_funding_source': state => {
      return _.get(state, 'primary_funding_source')
    }
  },
  mutations: {
    ACTIVATE(state, user) {
      state.user = user
    },
    LOGIN(state, user) {
      console.log('dipatching login', user.session.authorization_token)
      state.user = user
      state.logged_in = true
    },
    UPDATE(state, user) {
      _.merge(state.user, user)
    },
    SET_ACTIONS_REQUIRED(state, steps) {
      state.actions_required = steps
    },
    SET_FUNDING_SOURCES(state, funding_sources) {
      state.funding_sources = funding_sources
    },
    SET_PRIMARY_FUNDING_SOURCE(state, funding_source) {
      if (state.user) {
        state.primary_funding_source = funding_source
        const path = getDwollaAccountPath(state.user)
        return _.set(state, `${path}.primary_funding_source`, funding_source.id)
      }
    }
  },
  actions: {
    activate({ commit }, user) {
      commit('ACTIVATE', user)
      localStorage.setItem('activation_token', _.get(user, 'session.activation_token'))
    },
    async login({ commit }, user) {
      commit('LOGIN', user)
      localStorage.setItem('refresh_token', _.get(user, 'session.refresh_token'))
    },
    logout({ commit, dispatch }) {
      dispatch('reset_all')
      localStorage.removeItem('refresh_token')
    },
    update({ commit }, user) {
      commit('UPDATE', user)
    },
    set_actions_required({ commit }, steps) {
      commit('SET_ACTIONS_REQUIRED', steps)
    },
    set_funding_sources({ commit }, funding_sources) {
      commit('SET_FUNDING_SOURCES', funding_sources)
    },
    set_primary_funding_source({ commit }, funding_source) {
      commit('SET_PRIMARY_FUNDING_SOURCE', funding_source)
    }
  }
}
