import Lease from '@/models/lease'

jest.mock('@/utils/request_auth', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('lease_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

jest.mock('@/session', () => {
  return {
    $user: {
      id: '58e3e913e4e0555b7eba326f'
    }
  }
})

const lease = new Lease()

describe('LeaseModel', () => {
  it('should properly fetch a lease model', () => {
    expect.assertions(1)
    return lease.fetch()
      .then((res) => {
        expect(lease.type)
          .toBe('fixed_term')
      })
  })

  it('should properly resolve computed properties - address', () => {
    expect(lease.address)
      .toBe('344 Boylston St #4')
  })

  it('should properly resolve computed properties - full_address', () => {
    expect(lease.full_address)
      .toBe('344 Boylston St #4, Boston MA')
  })

  it('should properly resolve computed properties - term', () => {
    expect(lease.term)
      .toBe('5/1/2017 – 4/30/2018')
  })

  it('should properly resolve computed properties - length', () => {
    expect(lease.length.auto)
      .toBe('12 Months')
  })

  it('should properly resolve computed properties - tenants_sorted', () => {
    expect(lease.tenants_sorted[0]._id)
      .toBe('58e3e913e4e0555b7eba326f')
  })

  it('should properly resolve computed properties - splits', () => {
    expect(Object.keys(lease.splits).length)
      .toBe(1)
  })

  it('should properly resolve computed properties - splits_by_tenant_id', () => {
    expect(Object.keys(lease.splits_by_tenant_id).length)
      .toBe(4)
  })

  it('should properly resolve computed properties - splits_value_array', () => {
    expect(lease.splits_value_array.length)
      .toBe(4)
  })

  it('should properly resolve computed properties - total_rent_covered', () => {
    expect(lease.total_rent_covered)
      .toBe(3940)
  })

  it('should properly resolve computed properties - missing_splits', () => {
    expect(lease.missing_splits)
      .toBe(3)
  })

  it('should properly resolve computed properties - rent_remaining', () => {
    expect(lease.rent_remaining)
      .toBe(0)
  })

  it('should properly resolve computed properties - total_split', () => {
    expect(lease.total_split)
      .toBe(3940)
  })

  it('should properly resolve computed properties - rent_coverage', () => {
    expect(lease.rent_coverage)
      .toBe(100)
  })

  it('should be properly creating nested data from schema', () => {
    expect(lease.charges.scheduled.length)
      .toBe(1)
  })

  it('should properly decode model data using schema', () => {
    const output_data = lease.decode()
    expect(output_data.start_date)
      .toBe('2017-05-01T04:00:00.000Z')
  })

  it('should properly validate split - false', () => {
    const validate = lease.validateSplit(10)
    expect(validate.validated)
      .toBe(false)
  })

  it('should properly validate split - true', () => {
    const validate = lease.validateSplit(0)
    expect(validate.validated)
      .toBe(true)
  })

  it('should properly resolve length - month to month', () => {
    lease.end_date = undefined
    expect(lease.length)
      .toBe('N/A')
  })
})
