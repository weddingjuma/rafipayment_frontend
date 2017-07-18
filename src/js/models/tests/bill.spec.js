import moment from 'moment'
import Bill from '@/models/bill'

jest.mock('@/utils/request_auth', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('bill_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

const bill = new Bill()

describe('BillModel', () => {
  // override value of today
  const MockDate = require('mockdate')
  MockDate.set('7/1/2017')

  // Rent Bill
  it('should properly fetch a bill model', () => {
    expect.assertions(1)
    return bill.fetch()
      .then(() => {
        expect(bill.display_balance)
          .toBe(186.0)
      })
  })

  it('should resolve computed properties - bill_status', () => {
    expect(bill.bill_status)
      .toBe('overdue')
  })

  it('should resolve computed properties - label', () => {
    expect(bill.label)
      .toBe('rent - February')
  })

  it('should resolve computed properties - is_autopay', () => {
    expect(bill.is_autopay)
      .toBe(false)
  })

  it('should resolve computed properties - days_from_due', () => {
    expect(bill.days_from_due)
      .toBe(150)
  })

  it('should resolve computed properties - is_autopay', () => {
    expect(bill.is_autopay)
      .toBe(false)
  })

  it('should resolve computed properties - display_date', () => {
    expect(bill.display_date.toISOString())
      .toBe('2017-02-01T00:00:00.000Z')
  })

  it('should resolve computed properties - message', () => {
    expect(bill.message)
      .toBe('Overdue 150 days')
  })

  // NOTE: property and unit aren't currently resolved
  // it('should resolve computed properties - target', () => {
  //   expect(bill.target)
  //     .toBe('4 Roommates')
  // })

  it('should resolve computed properties - better_display_balance', () => {
    expect(bill.better_display_balance)
      .toBe(186)
  })

  it('should resolve computed properties - transfers_by_user', () => {
    expect(Object.keys(bill.transfers_by_user).length)
      .toBe(1)
  })

  it('should resolve computed properties - totals_by_user', () => {
    expect(Object.keys(bill.totals_by_user).length)
      .toBe(1)
  })

  it('should handle processType method', () => {
    expect(bill.processType(bill.type))
      .toBe('monthly')
  })
})
