import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import config from '@/config'

Raven
  .config(config.sentry_url)
  .addPlugin(RavenVue, Vue)
  .install()

const captureException = (error, showReportDialog) => {
  Raven.captureException(error)
  if (showReportDialog) Raven.showReportDialog()
}

window.onerror = (msg, url, lineNo, columnNo, error) => {
  captureException(error)
}

export default captureException
