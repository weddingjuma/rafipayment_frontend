import moment from 'moment'
import session from '@/session'
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

session.$user = {
  _id: '587e3ebbe4e05574a3f91e28',
  first_name: 'Test',
  last_name: 'Tester',
  role: 'tenant'
}

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

  it('should resolve computed properties - days_from_due', () => {
    expect(bill.days_from_due)
      .toBe(150)
  })

  it('should resolve computed properties - is_autopay', () => {
    expect(bill.is_autopay)
      .toBe(true)
  })

  it('should resolve computed properties - display_date', () => {
    expect(bill.display_date.toISOString())
      .toBe('2017-02-01T00:00:00.000Z')
  })

  it('should resolve computed properties - message', () => {
    expect(bill.message)
      .toBe('Overdue 150 days')
  })

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

  it('should resolve computed properties - targets', () => {
    expect(bill.target)
      .toBe('533 Washington St, #1A')
  })

  it('should resolve bill_status with zero balance', () => {
    bill.total = 0
    expect(bill.bill_status)
      .toBe('paid')
  })

  it('should resolve bill message with zero balance', () => {
    expect(bill.message)
      .toBe('Paid in full')
  })

  it('should resolve bill_status with balance and future due date', () => {
    MockDate.set(moment.utc().format('M/D/YYYY'))
    bill.total = 9000
    bill.due_date = moment.utc().add(3, 'months').toISOString()
    expect(bill.bill_status)
      .toBe('future')
  })

  it('should resolve bill message when due in the future', () => {
    expect(bill.message)
      .toBe('Due in 92 days')
  })

  it('should resolve bill_status with balance today as due date', () => {
    bill.due_date = moment.utc().toISOString()
    expect(bill.bill_status)
      .toBe('due')
  })

  it('should resolve bill message when today', () => {
    expect(bill.message)
      .toBe('Due today')
  })

  it('should handle processType method - fee', () => {
    expect(bill.processType('fee'))
      .toBe('fee')
  })

  it('should handle processType method - rent', () => {
    expect(bill.processType('rent'))
      .toBe('rent - July')
  })

  it('should handle processType method - previous_bill_overflow', () => {
    expect(bill.processType('previous_bill_overflow'))
      .toBe('from_previous_bill')
  })

  it('should resolve label for anytime bill', () => {
    bill.type = 'anytime'
    expect(bill.label)
      .toBe('one-time bill')
  })

  it('should resolve target for anytime', () => {
    expect(bill.target)
      .toBe('Test Tester')
  })

  it('should resolve is_autopay with no session user', () => {
    session.clearSessionUser()
    expect(bill.is_autopay)
      .toBe(false)
  })
})
