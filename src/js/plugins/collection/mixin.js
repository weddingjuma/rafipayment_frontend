import _ from 'lodash'
import { isDef } from './utils'

const makeComputedProp = (vm) => {
  if (!vm.$options.computed) vm.$options.computed = {}
  vm._collection = vm.$options.collection()
  vm.$options.computed.$collection = {
    get() {
      return vm._collection
    },
    set(val) {
      vm._collection = val
    }
  }
  vm.$options.computed.collection = () => {
    return vm._collection.collection
  }
}

const init = (vm) => {
  makeComputedProp(vm)
}

export default (Vue) => ({
  beforeCreate() {
    if (isDef(this.$options.collection)) {
      init(this)
    }
  },
  beforeDestroy() {
    if (_.get(this, '$options.collection')) {
      this.$collection.reset()
    }
  }
})
