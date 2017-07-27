import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import config from '@/config'
import session from '@/session'
import events from 'pubsub-js'

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

events.subscribe('login', () => {
  Raven.setUserContext({
    email: session.$user.email,
    id: session.$user.id,
    name: session.$user.full_name
  })
})

events.subscribe('logout', () => {
  Raven.setUserContext({
    email: null,
    id: null,
    name: null
  })
})

export default captureException
