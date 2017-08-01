/* global cordova */

import session from '@/session'
import events from 'pubsub-js'

export default class FirebaseAnalytics {
  constructor(router) {
    this.router = router
    this.analytics = cordova.plugins.firebase.analytics
    this.bindEvents()
    return this
  }
  onDeviceReady() {
    this.setupFirebaseAnalytics()
    return this
  }
  checkSession() {
    if (session.logged_in) {
      this.setUser(session.$user)
    }
  }
  bindEvents() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    )
    return this
  }
  bindRouterHook() {
    this.router.afterEach((to, from) => {
      this.logEvent('page_view', {
        page: to.path
      })
    })
    return this
  }
  bindSessionHook() {
    events.subscribe('login', (msg, user) => {
      this.setUser(user)
    })
  }
  setupFirebaseAnalytics() {
    this.analytics.setEnabled(true)
    this.checkSession()
    this.bindRouterHook()
    this.bindSessionHook()
    return this
  }
  logEvent(type, options) {
    this.analytics.logEvent(
      type,
      options,
      this.onSuccess,
      this.onError
    )
    return this
  }
  setUser(user) {
    this.analytics.setUserId(user.id)
    this.analytics.setUserProperty('full_name', user.full_name)
    this.analytics.setUserProperty('role', user.role)
    return this
  }
  onSuccess() {}
  onError(error) {
    console.warn('Firebase Analytics error', error)
  }
}

module.exports = FirebaseAnalytics
