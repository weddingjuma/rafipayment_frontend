import {
  parseCurrency,
  prettyCurrency,
  unitsHelper,
  statesHelper,
  sleep,
  Deferred
} from '@/utils'

describe('parseCurrency', () => {
  it('should correctly parse $1.00 with no arguments', () => {
    expect(parseCurrency('$1.00'))
      .toBe('1.00')
  })
  it('should correctly parse $1.00 with Number passed as desired output', () => {
    expect(parseCurrency('$1.00', Number))
      .toBe(1)
  })
  it('should correctly parse $9,385.30 with no arguments', () => {
    expect(parseCurrency('$9,385.30'))
      .toBe('9385.30')
  })
  it('should correctly parse $9,385.30 with Number passed as desired output', () => {
    expect(parseCurrency('$9,385.30', Number))
      .toBe(9385.3)
  })
})

describe('prettyCurrency', () => {
  it('should correctly parse 1 with no arguments', () => {
    expect(prettyCurrency(1))
      .toBe('$1.00')
  })
  it('should correctly parse 84953.2 with no arguments', () => {
    expect(prettyCurrency(84953.2))
      .toBe('$84,953.20')
  })
  it('should correctly parse 84953.2 with a sign argument', () => {
    expect(prettyCurrency(84953.2, '€'))
      .toBe('€84,953.20')
  })
  it('should correctly parse 84953.2 with false as a sign argument', () => {
    expect(prettyCurrency(84953.2, false))
      .toBe('84,953.20')
  })
})

describe('unitsHelper', () => {
  it('should correctly parse 1', () => {
    expect(unitsHelper(1))
      .toBe('#1')
  })
  it('should correctly parse Unit 1', () => {
    expect(unitsHelper('Unit 1'))
      .toBe('Unit 1')
  })
})

describe('statesHelper', () => {
  it('should correctly handle MA', () => {
    expect(statesHelper('MA'))
      .toBe('Massachusetts')
  })
  it('should correctly handle Massachusetts', () => {
    expect(statesHelper('Massachusetts'))
      .toBe('MA')
  })
})

describe('Deferred', () => {
  it('should resolve deferred promises', () => {
    const deferred = () => {
      const def = new Deferred()
      sleep(40).then(() => {
        def.resolve('ok')
      })
      return def.promise
    }
    return deferred().then((data) => {
      expect(data).toEqual('ok')
    })
  })
})
