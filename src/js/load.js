// core packages
import Vue from 'vue';
import session from './session'

// import VueModel from './plugins/model'
import VueBecome from './plugins/become'
Vue.use(VueBecome)

Vue.config.productionTip = false

// error tracking
import './modules/sentry'

// components
import loading from './components/load'

// global styles
import '../scss/styles.scss'

const env = process.env.NODE_ENV

if (env === 'cordova') {
  import('./modules/push_notifications')
}

const template = `
  <div class="app-container">
    <loading v-if="loading" />
    <div class="app" />
  </div>
`

// load session state before rendering app
export default new Vue({
  el: '#app',
  template,
  components: { loading },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ready() {
      return env === 'cordova' ? session.deviceready : true
    }
  },
  created() {
    if (env === 'ui') {
      this.loadApp()
    } else {
      this.init()
    }
  },
  methods: {
    init() {
      session.loadSession()
      .catch(() => {})
      .then(response => {
        this.loadApp()
      })
    },
    async loadApp() {
      this.loading = false
      await this.$become('ready', true)
      this.$destroy()
      import('@/app')
    }
  }
});
