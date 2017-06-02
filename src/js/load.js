// core packages
import Vue from 'vue';
import config from './config'
import session from '@/session'

import VueBecome from '@/plugins/become'
Vue.use(VueBecome)

Vue.config.productionTip = false;

// components
import loading from './components/load';

// global styles
import '../scss/styles.scss';

const env = process.env.NODE_ENV

if (config.sentry) {
  require(['./modules/sentry'])
}

if (config.debug) {
  require(['./debug'])
}

if (env === 'cordova') {
  require(['./modules/push_notifications'])
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
      loading: false
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
      await this.$become('ready', true)
      this.loading = false
      this.$destroy()
      require(['@/app'])
    }
  }
});
