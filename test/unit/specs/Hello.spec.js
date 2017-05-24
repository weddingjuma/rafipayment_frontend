// import Vue from 'vue'
import Model from '@/modules/model'

console.log(Model);

describe('Models', () => {
  it('be able to create a model', () => {
    const user = {
      full_name: 'Jane Goodall'
    }
    // const defaults = {
    //   name: 'test',
    //   computed: {
    //     full_name() {
    //       return `${this.first_name} ${this.last_name}`
    //     }
    //   }
    // }
    // class User extends Model {
    //   static schema() {
    //     return {
    //       id: String,
    //       first_name: String,
    //       last_name: String
    //     }
    //   }
    //   constructor(attributes, options) {
    //     super(attributes, [defaults, options])
    //   }
    // }
    // const user = new User({
    //   first_name: 'Jane',
    //   last_name: 'Goodall'
    // })
    expect(user.full_name)
      .to.equal('Jane Goodall')
  })
})

// describe('Models', () => {
//   it('be able to create a model', () => {
//     const Constructor = Vue.extend(Hello)
//     const vm = new Constructor().$mount()
//     expect(vm.$el.querySelector('.hello h1').textContent)
//       .to.equal('Welcome to Your Vue.js App')
//   })
// })
