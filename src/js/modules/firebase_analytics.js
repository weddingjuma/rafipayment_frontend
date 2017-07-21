/* global cordova */

export default class FirebaseAnalytics {
  constructor(router) {
    this.router = router
    this.analytics = cordova.plugins.firebase.analytics
    console.log(this.analytics);
    this.bindEvents()
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
  onDeviceReady() {
    this.setupFirebaseAnalytics()
    return this
  }
  setupFirebaseAnalytics() {
    this.analytics.setEnabled(true)
    this.bindRouterHook()
    return this
  }
  logEvent(type, options) {
    console.log('logging event', options);
    this.analytics.logEvent(type, options, this.onSuccess, this.onError)
    return this
  }
  onSuccess(response) {
    console.log('success', response);
  }
  onError(error) {
    console.warn('error', error)
  }
}

module.exports = FirebaseAnalytics
