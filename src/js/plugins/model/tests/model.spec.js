// import Vue from 'vue'
// import app from '@/app'
import session from '@/app'
import User from '@/models/user'

describe('Bound models', () => {
  it('should bind models to a view', () => {
    expect(session.user.full_name)
      .toBe('')
  })
})
// import VueModel from '@/plugins/model'
// import { Model } from '@/plugins/model'
// import User from '@/models/user'

// Vue.use(VueModel)

/*
const test_component = new Vue({
  // el: document.createElement('div'),
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
*/

// describe('VueModel', () => {
//   it('should bind models to vue instance', () => {
//     expect(test_component.$user.full_name)
//       .toBe('Tracy Jordan')
//   })
// })
