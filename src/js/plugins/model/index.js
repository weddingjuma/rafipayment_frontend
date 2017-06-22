import makeMixin from './mixin'
import Model from '@/plugins/model/model'

export default class VueModel {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue))
  }
}

export { Model }
