import { ObjectId, ISODate, Currency } from '@/modules/types'

describe('ISODate', () => {
  const new_date = new ISODate()
  it('should create a new empty ISODate instance', () => {
    expect(new_date.valueOf())
      .toBe(undefined)
  })

  it('should set the value on that empty ISODate instance', () => {
    new_date.set('Mon, 06 Mar 2017 21:22:23 +0000')
    expect(new_date.valueOf())
      .toBe('2017-03-06T21:22:23.000Z')
  })

  it('should create a new ISODate instance with a string argument', () => {
    const date = new ISODate('Mon, 06 Mar 2017 21:22:23 +0000')
    expect(date.valueOf())
      .toBe('2017-03-06T21:22:23.000Z')
  })

  const date = new ISODate({
    $date: 'Mon, 06 Mar 2017 21:22:23 +0000'
  })

  it('should process extended json successfully', () => {
    expect(date.valueOf())
      .toBe('2017-03-06T21:22:23.000Z')
  })

  it('should process extended json successfully', () => {
    expect(date.encode())
      .toEqual({
        $date: '2017-03-06T21:22:23.000Z'
      })
  })

  // it('should throw an error for invalid date input', () => {
  //   const makeDate = () => {
  //     return new ISODate('test')
  //   }
  //   expect(makeDate)
  //     .toThrow()
  // })
})

describe('ObjectId', () => {
  const new_id = new ObjectId()
  it('should create a new empty ObjectId instance', () => {
    expect(new_id.valueOf())
      .toBe(undefined)
  })

  it('should create a new ObjectId instance with a string argument', () => {
    const id = new ObjectId('8f9347uej83r98r3wj9j')
    expect(id.valueOf())
      .toBe('8f9347uej83r98r3wj9j')
  })

  const id = new ObjectId({
    $oid: '8f9347uej83r98r3wj9j'
  })
  it('should return id string from .valueOf()', () => {
    expect(id.valueOf())
      .toBe('8f9347uej83r98r3wj9j')
  })

  it('should reencode the id for mongo', () => {
    expect(id.encode())
      .toEqual({
        $oid: '8f9347uej83r98r3wj9j'
      })
  })
})

describe('Currency', () => {
  const currency = new Currency('1200.30')
  it('should create a new Currency instance', () => {
    expect(currency.valueOf())
      .toBe(1200.3)
  })

  it('should prettify value', () => {
    expect(currency.pretty())
      .toBe('$1,200.30')
  })
})
