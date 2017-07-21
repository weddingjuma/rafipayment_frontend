import VueAnalytics from 'vue-analytics'
import config from '@/config'

module.exports = function initAnalytics(Vue, router) {
  return Vue.use(VueAnalytics, {
    id: config.google_analytics.key,
    router
  })
}
