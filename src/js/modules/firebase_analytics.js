/* global cordova */

import session from '@/session'

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
    session.$on('login', this.setUser)
  }
  setupFirebaseAnalytics() {
    this.analytics.setEnabled(true)
    this.bindRouterHook()
    this.bindSessionHook()
    return this
  }
  logEvent(type, options) {
    console.log('logging event', options);
    this.analytics.logEvent(type, options, this.onSuccess, this.onError)
    return this
  }
  setUser(user) {
    console.log('logging login', user);
    this.analytics.setUserId(user._id)
    this.analytics.setUserProperty('full_name', user.full_name)
    this.analytics.setUserProperty('role', user.role)
    return this
  }
  onSuccess() {
    console.log('Firebase Analytics success');
  }
  onError() {
    console.warn('Firebase Analytics error')
  }
}

module.exports = FirebaseAnalytics
