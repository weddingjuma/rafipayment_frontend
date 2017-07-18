// external libraries
import './lib'

// main Vue plugins
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueTouch from 'vue-touch'
import VueMask from 'v-mask'
import VueModel from './plugins/model'
import VueCollection from './plugins/collection'
import VueBecome from './plugins/become'
import router from './router'
import store from './store'

// validators, config, filters
import { config } from './config/validation'
import { validators } from './modules/validators'
import { filters } from './modules/filters'

// custom components
import App from '@/components/app'
import Load from '@/components/load'
import Logo from '@/components/logo'
import Avatar from '@/components/avatar'
import Tabs from '@/components/tabs'
import Tab from '@/components/tab'
import Validation from '@/components/validation'
import Alert from '@/components/alert'
import Modal from '@/components/modal'
import Collapse from '@/components/collapse'
import Password from '@/components/password'
import Select from '@/components/select'
import InputCurrency from '@/components/currency'
import InputNumber from '@/components/number'
import IconArrowLeft from '@/components/icons/arrow_left'
import IconArrowRight from '@/components/icons/arrow_right'
import IconSuccess from '@/components/icons/success'
import IconExternal from '@/components/icons/external'

const components = [
  Load,
  Logo,
  Avatar,
  Tabs,
  Tab,
  Validation,
  Alert,
  Modal,
  Collapse,
  Password,
  Select,
  InputCurrency,
  InputNumber,
  IconArrowLeft,
  IconArrowRight,
  IconSuccess,
  IconExternal
]

const install = (Vue, opts = {}) => {
  // inject filters
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }

  // inject validators
  for (let key in validators) {
    VeeValidate.Validator.extend(key, validators[key])
  }

  // inject components
  components.map(component => {
    Vue.component(component.name, component)
  })

  // inject plugins
  Vue.use(VueTouch)
  Vue.use(VueModel)
  Vue.use(VueCollection)
  Vue.use(VueBecome)
  Vue.use(VueMask)
  Vue.use(VeeValidate, config)
}

const env = process.env.NODE_ENV

if (env === 'cordova') {
  require('@/modules/universal_links')
}

if (config.debug) {
  require('./debug')
}

install(Vue)

export default new Vue({
  el: '.app',
  router,
  store,
  template: '<App/>',
  components: { App },
  computed: {
    is_cordova() {
      return env === 'cordova'
    }
  },
  async beforeMount() {
    await this.checkBrowserSupport()
  },
  methods: {
    afterLeave(el) {
      window.scroll(0, 0)
    },
    checkBrowserSupport() {
      try {
        localStorage.setItem('_ls_test', 'testing_local_storage')
        localStorage.removeItem('_ls_test')
      } catch(error) {
        this.alert(
          `Your browser does not support local storage. If you
          are in private browsing mode, please disable it.`
        )
      }
    },
    alert(
      message = '',
      callback = () => {},
      title = 'Alert',
      button_label = 'OK'
    ) {
      const createAlert = this.is_cordova
        ? navigator.notification.alert
        : this._modalAlert
      return createAlert(message, callback, title, button_label)
    },
    confirm(
      message = '',
      _callback = () => {},
      title = 'Confirm',
      button_labels = ['OK', 'Cancel']
    ) {
      const createAlert = this.is_cordova
        ? navigator.notification.confirm
        : this._modalConfirm

      const callback = !this.is_cordova
        ? _callback
        : (index) => {
          if (index === 1) _callback()
        }
      return createAlert(message, callback, title, button_labels)
    },
    _modalAlert(message, callback, title, button_label) {
      return this.$store.dispatch('alert_show', {
        header: title,
        message: message,
        actions: {
          confirm: callback
        },
        button_labels: [ button_label ]
      })
    },
    _modalConfirm(message, callback, title, button_labels) {
      return this.$store.dispatch('alert_show', {
        header: title,
        message: message,
        actions: {
          confirm: callback,
          cancel: true
        },
        button_labels: button_labels
      })
    }
  }
})
