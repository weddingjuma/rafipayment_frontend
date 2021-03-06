import _ from 'lodash'

const defaults = {
  debug: true,
  sentry: false,
  sentry_url: null,
  dwolla_env: 'sandbox',
  google_places_key: '',
  urls: {
    api: 'https://api.staging.payment.rafiproperties.com/',
    sockets_server: 'ws://app.staging.payment.rafiproperties.com:4200'
  }
}

const env = process.env.NODE_ENV
const env_config = require(`./env/${env}`).config

const config = _.merge(defaults, env_config)

export default config
