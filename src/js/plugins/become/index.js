import makeMixin from './mixin'

export default class VueModel {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue))
  }
}
