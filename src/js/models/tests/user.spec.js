import User from '@/models/user'

jest.mock('@/utils/request_auth', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('tenant_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

describe('Basic User Models', () => {
  const user = new User()
  it('should fetch model data', () => {
    expect.assertions(1)
    return user.fetch()
      .then(() => {
        expect(user.role)
          .toBe('tenant')
      })
  })

  it('should resolve normal properties', () => {
    expect(user.first_name)
      .toBe('Taco')
  })

  it('should resolve computed properties - full_name', () => {
    expect(user.full_name)
      .toBe('Taco Cat')
  })

  it('should resolve computed properties - basePath', () => {
    expect(user.basePath)
      .toBe('tenants')
  })

  it('should resolve computed properties - initials', () => {
    expect(user.initials)
      .toBe('TC')
  })

  it('should resolve computed properties - dwolla_account', () => {
    expect(user.dwolla_account.customer_status)
      .toBe('created')
  })

  it('should resolve computed properties - is_active', () => {
    expect(user.is_active)
      .toBe(true)
  })

  it('should resolve computed properties - initials', () => {
    expect(user.initials)
      .toBe('TC')
  })

  it('should resolve computed properties - onboarding_steps', () => {
    expect(user.onboarding_steps.length)
      .toBe(0)
  })

  it('should resolve computed properties - secondary_steps', () => {
    expect(user.secondary_steps.length)
      .toBe(0)
  })

  it('should resolve basePath correctly', () => {
    expect(user.basePath)
      .toBe('tenants')
  })

  it('should resolve url correctly', () => {
    expect(user.url)
      .toBe('tenants/593af5eae4e0554e76b71f8a')
  })
})

describe('User Models with options passed', () => {
  const user = new User(null, {
    url: 'account/'
  })
  it('should fetch model data', () => {
    expect.assertions(1)
    return user.fetch()
      .then(() => {
        expect(user.role)
          .toBe('tenant')
      })
  })
  it('should resolve custom urlRoot', () => {
    expect(user.url)
      .toBe('account/')
  })
})

describe('User Models with attributes passed', () => {
  const user = new User({
    first_name: 'Jane',
    last_name: 'Goodall',
    role: 'tenant',
    id: '12345'
  })
  it('should resolve custom urlRoot', () => {
    expect(user.full_name)
      .toBe('Jane Goodall')
  })
})
