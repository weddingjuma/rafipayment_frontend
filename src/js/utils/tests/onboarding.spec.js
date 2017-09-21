import User from '@/models/user'

describe('$user.onboarding_steps - no lease', () => {
  const user = new User({
    role: 'tenant'
  })
  it('should push no-lease for a user with no lease', () => {
    expect(user.onboarding_steps[0].name)
      .toBe('no-lease')
  })
})

describe('$user.onboarding_steps - tenants', () => {
  const user = new User({
    role: 'tenant',
    leases: [
      1
    ],
    status: {
      password: false
    }
  })
  it('should push accept terms for new tenant', () => {
    expect(user.onboarding_steps[0].name)
      .toBe('terms')
  })

  it('should push dwolla-bank for new tenant', () => {
    expect(user.onboarding_steps[1].name)
      .toBe('dwolla-bank')
  })

  it('should push show-lease for new tenant', () => {
    expect(user.onboarding_steps[2].name)
      .toBe('show-lease')
  })

  it('should push split for new tenant', () => {
    expect(user.onboarding_steps[3].name)
      .toBe('split')
  })

  it('should push password for new tenant', () => {
    expect(user.onboarding_steps[4].name)
      .toBe('set-password')
  })
})

describe('$user.onboarding_steps - admins', () => {
  const user = new User({
    role: 'admin',
    company: {}
  })
  it('should push dwolla-account for first admin', () => {
    expect(user.onboarding_steps[0].name)
      .toBe('dwolla-account')
  })
})

describe('$user.secondary_steps - show-lease', () => {
  const user = new User({
    role: 'tenant',
    leases: [{}]
  })
  it('should push show lease for a user with a lease missing split', () => {
    expect(user.secondary_steps[0].name)
      .toBe('show-lease')
  })

  it('should push split for a user with a lease missing split', () => {
    expect(user.secondary_steps[1].name)
      .toBe('split')
  })
})
