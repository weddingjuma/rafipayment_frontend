import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import config from '@/config'

Raven
  .config(config.sentry_url)
  .addPlugin(RavenVue, Vue)
  .install()

console.log(Raven);

window.onerror = (msg, url, lineNo, columnNo, error) => {
  Raven.captureException(error)
  // Raven.showReportDialog()
}
