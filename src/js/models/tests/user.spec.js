import User from '@/models/user'

describe('Basic User Models', () => {
  const user = new User({
    first_name: 'Jane',
    last_name: 'Goodall',
    role: 'tenant',
    id: '1234'
  })
  it('should resolve normal properties', () => {
    expect(user.first_name)
      .toBe('Jane')
  })
  it('should resolve computed properties', () => {
    expect(user.full_name)
      .toBe('Jane Goodall')
  })
  it('should resolve basePath correctly', () => {
    expect(user.basePath)
      .toBe('tenants')
  })
  it('should resolve url correctly', () => {
    expect(user.url)
      .toBe('tenants/1234')
  })
})

describe('User Models with options passed', () => {
  const user = new User({
    first_name: 'Jane',
    last_name: 'Goodall',
    role: 'tenant',
    id: '12345'
  }, {
    url: 'account/'
  })
  it('should resolve custom urlRoot', () => {
    expect(user.url)
      .toBe('account/')
  })
})
