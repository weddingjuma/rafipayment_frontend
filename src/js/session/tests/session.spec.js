import session from '@/session'

jest.mock('@/utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('tenant_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

localStorage.setItem('refresh_token', 'test')

describe('session', () => {
  it('should load a mock account activation session', () => {
    expect.assertions(1)
    return session.loadActivation('test')
      .then(() => {
        expect(session.$user.role)
          .toBe('tenant')
      })
  })

  it('should load a mock session', () => {
    expect.assertions(1)
    return session.loadSession()
      .then(() => {
        expect(session.$user.role)
          .toBe('tenant')
      })
  })
})
