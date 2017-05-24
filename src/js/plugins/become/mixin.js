import { Deferred } from '@/utils'
import _ from 'lodash'

const default_options = () => {
  return {
    resolveIfDefined: true
  }
}

const makeAsyncWatcher = (vm, prop, val, options) => {
  const deferred = new Deferred()
  const unwatch = vm.$watch(prop, (value) => {
    if (val !== undefined && val !== value) {
      if (options.reject) {
        unwatch()
        deferred.reject(value)
      }
    } else {
      unwatch()
      deferred.resolve(value)
    }
  })
  // if prop is already equivalent to val param, resolve
  if (val !== undefined && vm[prop] === val) {
    unwatch()
    deferred.resolve(val)
  } else if (options.resolveIfDefined) {
    if (vm[prop]) deferred.resolve(vm[prop])
  }
  return deferred.promise
}

const init = (vm) => {
  vm.$become = (prop, val, options) => {
    const _options = _.merge(default_options(), options)
    return makeAsyncWatcher(vm, prop, val, _options)
  }
}

export default (Vue) => ({
  beforeCreate() {
    init(this)
  }
})
