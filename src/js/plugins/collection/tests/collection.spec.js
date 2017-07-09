import Vue from 'vue'
import * as VueCollection from '@/plugins/collection'
const { Collection } = VueCollection
import model from '@/models/bill'
// import User from '@/models/user'
import app from '@/__mocks__/app'
// import utils from '@/__mocks__/utils'

// console.log(app);
// console.log(utils);

// import data from

jest.mock('@/app', function() {
  return {
    $store: {
      dispatch() {
        return
      }
    }
  }
})
jest.mock('@/utils', function() {
  const data = require('@/__mocks__/collection_data').default
  const Deferred = () => {
    this.resolve = null
    this.reject = null
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    // Object.freeze(this)
    return this
  }
  const Request = () => {
    const promise = new Deferred()
    console.log({promise});
    promise.resolve(data())
    return promise
  }
  return {
    Request,
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
    // test_component.collection
    expect(test_component.collection.length)
      .toBe(11)
  })
})
