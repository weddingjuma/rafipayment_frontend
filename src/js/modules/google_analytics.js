import VueAnalytics from 'vue-analytics'
import config from '@/config'

export default class GoogleAnalytics {
  constructor(Vue, router) {
    this.analytics = VueAnalytics
    this.bindPlugin(Vue, router)
    return this
  }
  bindPlugin(Vue, router) {
    Vue.use(VueAnalytics, {
      id: config.google_analytics.key,
      router
    })
  }
}

module.exports = GoogleAnalytics
