<template>
  <div id="iav-container"></div>
</template>

<script>
import _ from 'lodash'
import { config } from '@/config'
import { load } from '@/utils'
import session from '@/session'

let _dwolla

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
  mounted() {
    load('https://cdn.dwolla.com/1/dwolla.js')
    .then(() => {
      _dwolla = dwolla // eslint-disable-line no-undef
      this.fetchIAVToken()
    })
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
      _dwolla.configure(config.dwolla_env);
      _dwolla.iav.start(this.iav_token, {
        container: 'iav-container',
        // stylesheets: [
        //   'https://fonts.googleapis.com/css?family=Roboto',
        //   config.urls.base_url + 'css/dwolla_style.css'
        // ],
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
      this.$emit('error', error)
      // console.warn('sentry should send here');
      // console.warn('process error', error);
    },
    processDwollaResponse(response) {
      const body = {
        id: _.get(response, '_links.funding-source.href').split('funding-sources/')[1],
        status: _.get(response, '_links.verify-micro-deposits') ? 'unverified' : 'verified'
      }
      const base_path = session.logged_in ? 'account' : 'tenants/activate'
      const method = session.logged_in ? 'PUT' : 'POST'
      // this.$emit('wait')
      return session.request(base_path + '/funding_sources', {
        method,
        body
      })
      .then((data) => {
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
