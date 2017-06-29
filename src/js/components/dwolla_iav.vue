<template>
  <div id="iav-container"></div>
</template>

<script>
import _ from 'lodash'
import config from '@/config'
import { load } from '@/utils'
import session from '@/session'
import sentry from '@/modules/sentry'

let dwolla_js
let dwolla_loaded = false

export default {
  data() {
    return {
      iav_token: ''
    }
  },
  computed: {
    iav_token_endpoint() {
      return session.logged_in ? 'account/iav' : 'tenants/activate/dwolla'
    }
  },
  async mounted() {
    if (!dwolla_loaded) {
      await load('https://cdn.dwolla.com/1/dwolla.js')
      dwolla_js = dwolla // eslint-disable-line no-undef
      dwolla_loaded = true
    }
    this.fetchIAVToken()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchIAVToken() {
      return session.request(this.iav_token_endpoint, {
        method: 'GET'
      }).then((response) => {
        this.iav_token = response;
        this.renderIAV()
      });
    },
    renderIAV() {
      dwolla_js.configure(config.dwolla_env);
      dwolla_js.iav.start(this.iav_token, {
        container: 'iav-container',
        stylesheets: [
          'https://fonts.googleapis.com/css?family=Roboto',
          'https://app.payment.rafiproperties.com/css/dwolla_style.css'
          // config.urls.base_url + 'css/dwolla_style.css'
        ],
        subscriber: this.iframeSubsciber,
        backButton: true,
        microDeposits: true,
        fallbackToMicroDeposits: true
      }, (error, response) => {
        // IAV successful
        if (response) {
          this.processDwollaResponse(response);
        //  IAV failed
        } else if (error) {
          console.warn(error)
          sentry(error)
        }
      })
      this.iframeListen()
    },
    iframeListen() {
      const $iframe = this.$el.querySelector('iframe')
      const iframe_onload = $iframe.onload

      $iframe.onload = () => {
        this.iframeLoaded()
        iframe_onload()
      }
    },
    iframeSubsciber(page) {
      // console.log(page);
      if (page.error) {
        this.handleError(page.error)
      }
      this.$emit('change', page)
    },
    iframeLoaded() {
      // this.loading = false
      this.$emit('load')
    },
    handleError(error) {
      // console.log('error', error);
      this.$emit('error', error)
      // console.warn('sentry should send here');
      // console.warn('process error', error);
    },
    processDwollaResponse(response) {
      // console.log('callback firing', response);
      const id = _.get(response, '_links.funding-source.href').split('funding-sources/')[1]
      const status = _.get(response, '_links.verify-micro-deposits') ? 'unverified' : 'verified'
      const body = {
        id,
        status
      }
      const base_path = session.logged_in ? 'account' : 'tenants/activate'
      const method = 'POST'
      // this.$emit('wait')
      return session.request(base_path + '/funding_sources', {
        method,
        body
      })
      .then(async (data) => {
        if (session.logged_in) {
          // console.log('dwolla_iva.vue thinking session is logged in');
          await session.loadSession()
        } else {
          const token = _.get(this.$route.query, 'token')
          await session.loadActivation(token)
        }
        this.$emit('complete', data)
      })
      .catch((error) => {
        this.$emit('error', error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
#iav-container {
  iframe {
    width: 100%;
  }
}
</style>
