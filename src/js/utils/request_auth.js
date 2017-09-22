// authenticated XHR

import _ from 'lodash'
import store from '@/store'
import { Request, imports } from '@/utils'

export default async function RequestAuth (url = '', _options = {}) {
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
  const options = _.merge({}, defaults, _options)
  let output

  try {
    const response = await new Request(url, options)
    const error = _.get(response, 'error')

    if (error === 'token_expired') {
      const [session] = await imports(
        import('@/session')
      )
      await session.loadSession()
      const response = await RequestAuth(url, _options)
      output = response
    } else if (error === 'token_deauthorized') {
      const app = await imports(
        import('@/app')
      )
      app.$router.push('/')
    } else {
      output = response
    }
  } catch (error) {
    throw error
  }
  return output
}
