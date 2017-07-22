import {
  parseCurrency,
  prettyCurrency,
  unitsHelper,
  statesHelper,
  sleep,
  load,
  isTouchDevice,
  isMobile,
  Deferred,
  Request,
  getPanStartPosition,
  toggleStatusBar
} from '@/utils'

jest.mock('@/utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('tenant_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

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

describe('Request', () => {
  it('should make a request', () => {
    expect.assertions(1)
    return new Request('/')
      .then((res) => {
        expect(res)
          .toBeInstanceOf(Object)
          // .toEqual({message: 'running'})
      })
  })
})

describe('load', () => {
  it('should load a js file from a cdn', () => {
    expect(load('test.js'))
      .toBeInstanceOf(Object)
  })
})

describe('isTouchDevice', () => {
  it('should detect touch devices', () => {
    const check_touch = isTouchDevice()
    expect(check_touch)
      .toBe(false)
  })
})

describe('isMobile', () => {
  it('should detect mobile devices', () => {
    const check_mobile = isMobile()
    expect(check_mobile)
      .toBe(false)
  })
})

describe('getPanStartPosition', () => {
  it('should calculate pan start position - 1', () => {
    expect(getPanStartPosition({
      deltaX: 30,
      deltaY: 78,
      srcEvent: {
        pageX: 12,
        pageY: 48
      }
    }))
    .toEqual({'x': -18, 'y': -30})
  })

  it('should calculate pan start position - 2', () => {
    expect(getPanStartPosition({
      deltaX: 30,
      deltaY: 78,
      srcEvent: {
        screenX: 12,
        screenY: 48
      }
    }))
    .toEqual({'x': -18, 'y': -30})
  })

  it('should calculate pan start position - 3', () => {
    expect(getPanStartPosition({
      deltaX: 30,
      deltaY: 78,
      srcEvent: {}
    }))
    .toEqual({'x': -30, 'y': -78})
  })
})

global.StatusBar = (value) => {
  return value
}

describe('toggleStatusBar', () => {
  it('should run toggleStatusBar', () => {
    const check = toggleStatusBar(true)
    expect(check)
      .toBe(undefined)
  })
  it('should run toggleStatusBar', () => {
    const check = toggleStatusBar(false)
    expect(check)
      .toBe(undefined)
  })
})
