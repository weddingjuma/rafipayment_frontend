import Vue from 'vue'
import VueModel from '@/plugins/model'
import User from '@/models/user'

Vue.use(VueModel)

jest.mock('../utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('model_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

const test_component = new Vue({
  template: '<div/>',
  models: {
    user() {
      return new User()
    }
  },
  methods: {
    fetch() {
      return this.$user.fetch()
    }
  }
})

describe('VueModel', () => {
  it('should correctly bind models to vue instance', () => {
    expect(test_component.$user.first_name)
      .toBe('')
  })

  it('should correctly fetch model data', () => {
    expect.assertions(1)
    return test_component.$user.fetch()
      .then(() => {
        expect(test_component.$user.full_name)
          .toBe('Taco Cat')
      })
  })

  it('should reset models on destroy', () => {
    test_component.$destroy()
    expect(test_component.$user.first_name)
      .toBe('')
  })
})
