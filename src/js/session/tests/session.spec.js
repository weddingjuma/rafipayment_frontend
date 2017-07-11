import session from '@/session'

jest.mock('@/utils/request', () => {
  return (url) => {
    const { Deferred } = require('@/utils')
    const data = url.includes('funding_sources')
      ? require('funding_sources_data').default
      : require('tenant_data').default
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

  it('should clear session completely', () => {
    session.clearSessionUser()
    expect(session.$user.role)
      .toBe('')
  })

  it('should refresh a mock session', () => {
    expect.assertions(1)
    return session.loadSession()
      .then(() => {
        expect(session.$user.role)
          .toBe('tenant')
      })
  })

  it('should check authentication', () => {
    expect(session.checkAuth())
      .toBe(true)
  })

  it('should login using user credentials', () => {
    expect.assertions(1)
    session.clearSessionUser()
    return session.login({
      email: 'test',
      password: 'test'
    })
    .then(() => {
      expect(session.$user.role)
        .toBe('tenant')
    })
  })

  it('should update session user', () => {
    expect.assertions(1)
    return session.update()
      .then(() => {
        expect(session.$user.role)
          .toBe('tenant')
      })
  })

  it('should log out', () => {
    expect.assertions(1)
    return session.logout()
      .then(() => {
        expect(session.$user.role)
          .toBe('')
      })
  })
})
