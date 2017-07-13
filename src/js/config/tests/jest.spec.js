import './tests/jest'

describe('localStorage mock should work', () => {
  it('it should be able to handle basic input', () => {
    localStorage.setItem('test1', 'test1')
    expect(localStorage.getItem('test1'))
      .toBe('test1')
  })

  it('it should be able to handle basic input', () => {
    localStorage.setItem('test2', 'test2')
    expect(localStorage.getItem('test2'))
      .toBe('test2')
  })

  localStorage.clear()

  it('it clear localStorage', () => {
    expect(localStorage.clear())
      .toBe(undefined)
  })
})
