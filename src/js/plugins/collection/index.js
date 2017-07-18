import makeMixin from './mixin'
import Collection from './collection'

console.log('loading collection plugin');

export default class VueCollection {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue))
  }
}

export { Collection }
