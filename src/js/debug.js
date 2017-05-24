import Vue from 'vue'

import Debug from './components/debug'

const DebugView = new Vue({
  el: document.createElement('div'),
  template: '<Debug/>',
  components: { Debug }
})

document.body.appendChild(DebugView.$el)
