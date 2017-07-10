import _ from 'lodash'
import store from '@/store'
import moment from 'moment'
import { Request, Deferred } from '@/utils'

export function isDef (v) {
  if (v === undefined) return false
  return !_.some(...v, _.isEmpty)
}

export function request (url = '', options = {}) {
  const Authorization = store.getters['session:auth_token']
  const Refresh = localStorage.getItem('refresh_token')
  const Activation = localStorage.getItem('activation_token')

  const headers = {
    Authorization,
    Activation,
    Refresh
  }
  const defaults = {
    method: 'GET',
    headers
  }
  options = _.merge({}, defaults, options)

  const req = new Request(url, options)
  const deferred = new Deferred()

  req.then((response) => {
    if (_.get(response, 'error') === 'token_expired') {
      const session = require('@/session')
      session.loadSession()
      .then(() => {
        request(url, options)
        .then((response) => {
          deferred.resolve(response)
        })
      })
    } else {
      deferred.resolve(response)
    }
  })
  .catch((error) => {
    deferred.reject(error)
  })
  return deferred.promise
}

// sorting

export const sortByDate = (key, a, b) => {
  return moment.utc(a[key]) > moment.utc(b[key]) ? 1 : -1
}

export const sort = (key, a, b) => {
  return a[key] < b[key] ? 1 : -1
}

// reset collection or model state

export const resetState = (state, defaults) => {
  Object.keys(defaults).forEach(key => {
    state[key] = defaults[key]
  })
}

// reset all collection or model states

export const resetAllStates = (state, modules) => {
  Object.keys(modules).forEach(key => {
    resetState(state[key], modules[key].defaults())
  })
}
