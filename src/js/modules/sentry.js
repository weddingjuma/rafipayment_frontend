import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import config from '@/config'

const env = process.env.NODE_ENV
const release = process.version

if (env !== 'dev') {
  Raven
    .config(config.sentry_dsn, {
      release
    })
    .addPlugin(RavenVue, Vue)
    .install()
}

const captureException = env === 'dev'
  ? console.warn
  : (error, showReportDialog) => {
    Raven.captureException(error)
    if (showReportDialog) Raven.showReportDialog()
  }

window.onerror = (msg, url, lineNo, columnNo, error) => {
  captureException(error)
}

export default captureException
