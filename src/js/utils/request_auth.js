// authenticated XHR

import _ from 'lodash'
import store from '@/store'
import { Request, Deferred } from '@/utils'

export default function request (url = '', options = {}) {
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
