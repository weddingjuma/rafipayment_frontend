import { ObjectId, ISODate, Currency } from '@/modules/types'

describe('ISODate', () => {
  it('should create a new ISODate instance', () => {
    const date = new ISODate('Tue, 11 Jul 2017 18:41:59 +0000')
    expect(date.valueOf())
      .toBe('2017-07-11T18:41:59.000Z')
  })

  const date = new ISODate({
    $date: 'Tue, 11 Jul 2017 18:41:59 +0000'
  })

  it('should process extended json successfully', () => {
    expect(date.valueOf())
      .toBe('2017-07-11T18:41:59.000Z')
  })

  it('should process extended json successfully', () => {
    expect(date.encode())
      .toEqual({
        $date: '2017-07-11T18:41:59.000Z'
      })
  })
})

describe('ObjectId', () => {
  const id = new ObjectId({
    $id: '8f9347uej83r98r3wj9j'
  })
  it('should create a new ObjectId instance', () => {
    expect(id.valueOf())
      .toBe('8f9347uej83r98r3wj9j')
  })

  it('should create a new ObjectId instance', () => {
    expect(id.encode())
      .toEqual({
        $id: '8f9347uej83r98r3wj9j'
      })
  })
})

describe('Currency', () => {
  it('should create a new Currency instance', () => {
    const currency = new Currency('1200.30')
    expect(currency.valueOf())
      .toBe(1200.3)
  })
})
