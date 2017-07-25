import Vue from 'vue'
import store from '@/store'

const test_component = new Vue({
  store
})

describe('vuex store - main', () => {
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
        // template: null,
        actions: {},
        button_labels: []
      })
  })

  it('should dispatch alert_show', () => {
    test_component.$store.dispatch('alert_show', {
      header: 'Test',
      message: 'test alert',
      actions: {
        confirm: null
      },
      button_labels: ['yes', 'no']
    })
    expect(test_component.$store.getters['app:alert_visible'])
      .toBe(true)
  })

  it('should dispatch alert_hide', () => {
    test_component.$store.dispatch('alert_hide')
    expect(test_component.$store.getters['app:alert_visible'])
      .toBe(false)
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
        // template: null,
        actions: {},
        button_labels: []
      })
  })
})

describe('vuex store - session', () => {
  it('should return getters - dwolla (with no user)', () => {
    expect(test_component.$store.getters['session:dwolla'])
      .toBe(null)
  })

  it('should dispatch login', () => {
    test_component.$store.dispatch('login', {
      _id: '12345',
      role: 'tenant',
      dwolla: {
        test: true
      }
    })
    expect(test_component.$store.getters['session:user']._id)
      .toBe('12345')
  })

  it('should return getters - role', () => {
    expect(test_component.$store.getters['session:role'])
      .toBe('tenant')
  })

  it('should return getters - funding_sources', () => {
    expect(test_component.$store.getters['session:funding_sources'])
      .toBeInstanceOf(Object)
  })

  it('should return getters - primary_funding_source', () => {
    expect(test_component.$store.getters['session:primary_funding_source'])
      .toBe(null)
  })

  it('should return getters - dwolla', () => {
    expect(test_component.$store.getters['session:dwolla'])
      .toBeInstanceOf(Object)
  })

  it('should dispatch set_actions_required', () => {
    test_component.$store.dispatch('set_actions_required', [])
    expect(test_component.$store.getters['session:actions_required'].length)
      .toBe(0)
  })

  it('should dispatch login - admin', () => {
    test_component.$store.dispatch('login', {
      _id: '12345',
      role: 'admin',
      company: {
        dwolla: {
          test: true
        }
      }
    })
    expect(test_component.$store.getters['session:dwolla'])
      .toBeInstanceOf(Object)
  })
})
