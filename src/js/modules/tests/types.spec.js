import { ISODate, Currency } from '@/modules/types'

describe('ISODate', () => {
  it('should create a new ISODate instance', () => {
    const date = new ISODate('Tue, 11 Jul 2017 18:41:59 +0000')
    expect(date.valueOf())
      .toBe('2017-07-11T18:41:59.000Z')
  })
})

describe('Currency', () => {
  it('should create a new Currency instance', () => {
    const currency = new Currency('1200.30')
    expect(currency.valueOf())
      .toBe(1200.3)
  })
})
