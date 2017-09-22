import Vue from 'vue'
import * as VueCollection from '@/plugins/collection'
import model from '@/models/bill'

const { Collection } = VueCollection

jest.mock('@/app', function() {
  return {
    $store: {
      dispatch() {
        return
      }
    }
  }
})

jest.mock('@/utils/request', () => {
  return () => {
    const { Deferred } = require('@/utils')
    const data = require('collection_data').default
    const promise = new Deferred()
    promise.resolve(data())
    return promise.promise
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

  it('should delete a model from a collection', () => {
    expect.assertions(1);
    return test_component.$collection.delete('587e3faae4e05574a49cdcd6')
      .then(() => {
        expect(test_component.collection.length)
          .toBe(11)
      })
  })

  it('should add a model to a collection', () => {
    expect.assertions(1);
    return test_component.$collection.add({
      _id: '587e3faae4e05574a49cdcd6'
    })
    .then(() => {
      expect(test_component.collection.length)
        .toBe(12)
    })
  })

  it('should reset the collection successfully on destroy', () => {
    test_component.$destroy()
    expect(test_component.collection.length)
      .toBe(0)
  })
})
