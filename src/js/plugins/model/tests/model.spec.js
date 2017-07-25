import Vue from 'vue'
import VueModel, { Model } from '@/plugins/model'
import User from '@/models/user'

Vue.use(VueModel)

jest.mock('@/utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('tenant_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
})

describe('VueModel basics', () => {
  it('should access static schema property', () => {
    expect(Model.schema())
      .toBeInstanceOf(Object)
  })

  const model = new User({
    id: '123'
  })
  it('should fetch a model', () => {
    expect.assertions(1)
    return model.fetch()
      .then(() => {
        expect(model.full_name)
          .toBe('Taco Cat')
      })
  })

  it('should resolve toJSON', () => {
    expect(model.toJSON())
      .toBeInstanceOf(Object)
  })

  it('should resolve decode', () => {
    expect(model.decode())
      .toBeInstanceOf(Object)
  })

  it('should resolve schema', () => {
    expect(model.schema())
      .toBeInstanceOf(Object)
  })

  it('should destroy a model', () => {
    expect(model.destroy())
      .toBeInstanceOf(Promise)
  })
})

const test_component = new Vue({
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

describe('VueModel binding', () => {
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

  it('should correctly save new model data', () => {
    expect.assertions(1)
    return test_component.$user.save({
      first_name: 'Robot',
      last_name: 'Obor'
    })
    .then(() => {
      expect(test_component.$user.full_name)
        .toBe('Robot Obor')
    })
  })

  it('should reset models on destroy', () => {
    test_component.$destroy()
    expect(test_component.$user.first_name)
      .toBe('')
  })
})
