import Lease from '@/models/lease'

jest.mock('@/utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('lease_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
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

  it('should properly resolve computed properties - full_address', () => {
    expect(lease.full_address)
      .toBe('344 Boylston St #4, Boston MA')
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
})
