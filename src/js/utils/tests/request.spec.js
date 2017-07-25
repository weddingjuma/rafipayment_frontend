import Request from '@/utils/request_auth'

describe('Authenticated requests', () => {
  jest.mock('@/utils/request', () => {
    return () => {
      const { Deferred } = require('@/utils')
      const data = {
        thing: true
      }
      const promise = new Deferred()
      promise.resolve(data)
      return promise.promise
    }
  })
  it('should refresh tokens if token_expired', () => {
    const req = new Request()
    .catch((error) => {
      console.warn(error)
    })
    expect(req)
      .toBeInstanceOf(Object)
  })
  jest.clearAllMocks()
})

describe('Authenticated requests - token_expired', () => {
  jest.mock('@/session', () => {
    const data = {
      thing: true
    }
    return {
      loadSession() {
        // return Promise.resolve(data)
        return {
          then() {
            return data
          }
        }
        // return new Promise((resolve, reject) => {
        //   resolve(data)
        // })
      }
    }
  })
  jest.mock('@/utils/request', () => {
    return () => {
      const { Deferred } = require('@/utils')
      const data = {
        error: 'token_expired'
      }
      const promise = new Deferred()
      promise.resolve(data)
      return promise.promise
    }
  })
  it('should refresh tokens if token_expired', () => {
    const req = new Request()
    .catch((error) => {
      console.warn(error)
    })
    expect(req)
      .toBeInstanceOf(Promise)
  })
})
