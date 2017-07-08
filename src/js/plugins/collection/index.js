import makeMixin from './mixin'
import Collection from './collection'

export default class VueCollection {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue))
  }
}

export { Collection }
