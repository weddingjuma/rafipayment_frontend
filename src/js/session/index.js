import _ from 'lodash'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import store from '@/store'
import Request from '@/utils/request_auth'
import UserModel from '@/models/user'
import VueModel from '@/plugins/model'
import events from 'pubsub-js'

Vue.use(VueModel)

const session = new Vue({
  name: 'session',
  store,
  data() {
    return {
      deviceready: null
    }
  },
  models: {
    user() {
      return new UserModel(null, {
        name: 'session_user',
        url: 'account/',
        persist: true
      })
    }
  },
  computed: {
    ...mapGetters({
      logged_in: 'session:logged_in',
      primary_funding_source: 'session:primary_funding_source'
    })
  },
  methods: {
    checkAuth() {
      return this.logged_in
    },
    request(url = '', options = {}) {
      return new Request(url, options)
    },
    loadActivation(token) {
      const body = { token }
      this.$store.dispatch('loading_begin')
      const request = this.request('users/activate/contact', {
        method: 'PUT',
        body
      })
      request.then((response) => {
        this.dispatchActivate(response)
      })
      .catch((error) => {
        console.warn(error)
      })
      .then(() => {
        this.$store.dispatch('loading_end')
      })
      return request
    },
    loadSession() {
      const token = localStorage.getItem('refresh_token')
      if (token === 'undefined') {
        return localStorage.removeItem('refresh_token')
      }
      const promise = !token
        ? Promise.reject('No token')
        : this.request('users/tokens')
          .then(response => {
            this.dispatchLogin(response)
          })
          .catch((error) => {
            console.warn(error)
          })
          .then(() => {
            this.$store.dispatch('loading_end')
          })

      return promise
    },
    login(credentials) {
      let body = {
        email: credentials.email,
        password: credentials.password
      }

      this.bindDeviceData(body)

      const request = this.request('users/login', {
        method: 'POST',
        body
      })
      request.then(response => {
        this.dispatchLogin(response)
      })
      .catch(() => {})
      .then(() => {
        this.$store.dispatch('loading_end')
      })
      return request
    },
    logout() {
      this.$store.dispatch('loading_begin')

      let body = {}
      this.bindDeviceData(body)

      const request = this.request('users/logout', {
        method: 'POST',
        body
      })
      .catch(() => {})
      .then(response => {
        this.$store.dispatch('logout')
        this.clearSessionUser()
      })
      return request
    },
    update() {
      return this.request('account/')
      .then((user) => {
        this.$store.dispatch('update', user)
      })
    },
    dispatchActivate(user) {
      this.$store.dispatch('activate', user)
      this.$user = this.$store.getters['session:user']
      if (_.get(this.$user, 'dwolla_account.customer_id')) {
        this.fetchFundingSources()
      }
    },
    dispatchLogin(user) {
      this.$store.dispatch('login', user)
      this.bindSessionUser()
    },
    bindDeviceData(body) {
      if (process.env.NODE_ENV === 'cordova') {
        const registrationId = localStorage.getItem('registrationId')
        if (registrationId) _.set(body, 'device.id', registrationId)
        const platformId = localStorage.getItem('platformId')
        if (platformId) _.set(body, 'device.type', platformId)
      }
    },
    bindSessionUser() {
      this.$user = this.$store.getters['session:user']
      events.publish('login', this.$user)
      this.checkForActionsRequired()
    },
    checkForActionsRequired() {
      const actions_required = this.$user.secondary_steps
      if (_.get(actions_required, 'length')) {
        this.$store.dispatch('set_actions_required', actions_required)
      }
      this.fetchFundingSources()
      return actions_required
    },
    fetchFundingSources() {
      if (!['tenant'].includes(this.$user.role)) return
      const path = this.logged_in ? 'account' : 'tenants/activate'

      return this.request(path + '/funding_sources')
        .then((response) => {
          this.$store.dispatch('set_funding_sources', response)
          this.setPrimaryFundingSource(response)
        })
        .catch((error) => {
          console.warn(error)
        })
    },
    setPrimaryFundingSource(funding_sources) {
      const primary_id = _.get(this.$user, 'dwolla.primary_funding_source')
      const primary = funding_sources.find((funding_source) => {
        return funding_source.id === primary_id
      })
      this.$store.dispatch('set_primary_funding_source', primary || {})
    },
    clearSessionUser() {
      this.$user.reset()
      events.publish('logout')
    }
  }
})

const { request } = session

export default session
export { request }
