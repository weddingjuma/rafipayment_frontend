import Vue from 'vue'
import store from '@/store'

const test_component = new Vue({
  store
})

describe('vuex store', () => {
  it('should bind the store to the vue instance', () => {
    expect(test_component.$store)
      .toBeInstanceOf(Object)
  })

  it('should return getters - app:loading', () => {
    expect(test_component.$store.getters['app:loading'])
      .toBe(false)
  })

  it('should return getters - app:nav_visible', () => {
    expect(test_component.$store.getters['app:nav_visible'])
      .toBe(false)
  })

  it('should return getters - app:alert_visible', () => {
    expect(test_component.$store.getters['app:alert_visible'])
      .toBe(false)
  })

  it('should return getters - app:alert', () => {
    expect(test_component.$store.getters['app:alert'])
      .toEqual({
        header: '',
        message: '',
        template: null,
        actions: {},
        button_labels: []
      })
  })

  it('should return getters - app:forgot_email', () => {
    expect(test_component.$store.getters['app:forgot_email'])
      .toBe('')
  })

  // actions
  it('should dispatch nav_toggle', () => {
    test_component.$store.dispatch('nav_toggle')
    expect(test_component.$store.getters['app:nav_visible'])
      .toBe(true)
  })

  it('should dispatch nav_hide', () => {
    test_component.$store.dispatch('nav_hide')
    expect(test_component.$store.getters['app:nav_visible'])
      .toBe(false)
  })

  it('should dispatch nav_show', () => {
    test_component.$store.dispatch('nav_show')
    expect(test_component.$store.getters['app:nav_visible'])
      .toBe(true)
  })

  it('should dispatch set_forgot_email', () => {
    test_component.$store.dispatch('set_forgot_email', 'test@gmail.com')
    expect(test_component.$store.getters['app:forgot_email'])
      .toBe('test@gmail.com')
  })

  it('should dispatch reset', () => {
    test_component.$store.dispatch('reset')
    expect(test_component.$store.getters['app:alert'])
      .toEqual({
        header: '',
        message: '',
        template: null,
        actions: {},
        button_labels: []
      })
  })
})
