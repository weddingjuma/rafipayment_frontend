import 'whatwg-fetch'
import config from '@/config'

// return error data from request

export const handleXHRErrors = (response) => {
  let json = response.json();
  if (!response.ok) return json.then(Promise.reject.bind(Promise))
  // if (tracking) console.log(tracking) // send to sentry
  return json
}

const handleTimeout = (error) => {
  if (error.message === 'request_timeout') {
    require('@/app')
    .then(({default: app}) => {
      app.alert(
        'The request timed out',
        null,
        'Timed out'
      )
    })
  }
}

// generic, unauthenticated XHR

const timeout_duration = 30000

export default (url = '', {
  method = 'GET',
  body,
  headers = {}
} = {}) => {
  if (body) body = JSON.stringify(body)
  if (!/^https?:\/\//i.test(url)) url = config.urls.api + url

  const _headers = new Headers()

  for (let key in headers) {
    if (headers[key]) _headers.append(key, headers[key])
  }

  // side effects?
  headers = _headers

  const race = Promise.race([
    fetch(url, {
      method,
      headers,
      body
    })
    .then(handleXHRErrors),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request_timeout')), timeout_duration)
    })
  ])

  race.catch(handleTimeout)
  return race
}

// export default class Request {
//   constructor(url = '', {
//     method = 'GET',
//     body,
//     headers = {}
//   } = {}) {
//     this.url = !/^https?:\/\//i.test(url)
//       ? config.urls.api + url
//       : url
//     this.method = method
//     if (body) this.body = JSON.stringify(body)
//     this.headers = headers
//     return this.init()
//   }
//   init() {
//     const headers = new Headers()
//     for (let key in this.headers) {
//       if (this.headers[key]) {
//         headers.append(key, this.headers[key])
//       }
//     }
//     const race = Promise.race([
//       fetch(this.url, {
//         method: this.method,
//         body: this.body,
//         headers
//       })
//       .then(handleXHRErrors),
//       new Promise(function (resolve, reject) {
//         setTimeout(() => {
//           reject(new Error('request_timeout'))
//         }, timeout_duration)
//       })
//     ])
//     race.catch(handleTimeout)
//     return race
//   }
//   retry() {
//     return this.init()
//   }
// }
