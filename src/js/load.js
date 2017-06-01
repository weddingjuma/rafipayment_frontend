// packages
import Vue from 'vue';
import '@/utils'
import VueModel from '@/plugins/model'

Vue.use(VueModel)

Vue.config.productionTip = false;

// components
import Loader from './components/load';

// global styles
import '../scss/styles.scss';

import config from './config'

if (config.sentry) {
  require(['./modules/sentry'])
}

if (config.debug) {
  require(['./debug'])
}

if (process.env.NODE_ENV === 'cordova') {
  require(['./modules/push_notifications'])
}

// render a loading component so we can
// build the app asynchronously
export default new Vue({
  el: '#app',
  template: '<Loader/>',
  components: { Loader }
});
