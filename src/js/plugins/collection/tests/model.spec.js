import Vue from 'vue'
import VueModel from '@/plugins/model'
import User from '@/models/user'

Vue.use(VueModel)

const test_component = new Vue({
  template: '<div/>',
  models: {
    user() {
      return new User({
        first_name: 'Tracy',
        last_name: 'Jordan'
      })
    }
  }
})

describe('VueModel', () => {
  it('should correctly bind models to vue instance', () => {
    expect(test_component.$user.full_name)
      .toBe('Tracy Jordan')
  })

  it('should reset models on destroy', () => {
    test_component.$destroy()
    expect(test_component.$user.first_name)
      .toBe('')
  })
})
