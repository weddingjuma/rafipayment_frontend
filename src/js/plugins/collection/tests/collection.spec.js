import Vue from 'vue'
import * as VueCollection from '@/plugins/collection'
const { Collection } = VueCollection
import model from '@/models/bill'

jest.mock('@/app', function() {
  return {
    $store: {
      dispatch() {
        return
      }
    }
  }
})
jest.mock('@/session', function() {
  const data = require('../__mocks__/collection_data').default
  const Deferred = () => {
    this.resolve = null
    this.reject = null
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    return this
  }
  const request = () => {
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
  }
  return {
    request,
    Deferred
  }
})

Vue.use(VueCollection.default)

const test_component = new Vue({
  template: '<div/>',
  collection() {
    return new Collection({
      model,
      basePath: 'account/bills',
      sortBy: 'due_date',
      reverse: true
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
    }
  }
})

describe('VueCollection', () => {
  it('should correctly bind a collection to vue instance', () => {
    expect(test_component.collection instanceof Array)
      .toBe(true)
  })

  it('should fetch models from a collection', () => {
    expect(test_component.collection.length)
      .toBe(12)
  })

  it('should reset the collection successfully on destroy', () => {
    test_component.$destroy()
    expect(test_component.collection.length)
      .toBe(0)
  })
})
