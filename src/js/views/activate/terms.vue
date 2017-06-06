<template>
  <div class="step">
    <div class="panel small">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99">
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)"/>
          <path d="M95.18,47.45L139.66,92.1h-9.6V128H106.9V109.72H83.47V128H60.31V92.1h-8L95.18,47.45M95.06,34.58l-6.37,6.64L45.85,85.86,31.23,101.1H51.31V137H92.47V118.72H97.9V137h41.16V101.1h22.27L146,85.74,101.56,41.1l-6.5-6.52h0Z" transform="translate(-3 -3)"/>
        </svg>
      </div>

      <div class="form-model">
        <div class="description">
          <p>Hi, {{ $user.first_name }}!</p>
          <p>We use a highly secure third party payment processor, <a href="https://dwolla.com" class="strong" target="_blank">Dwolla</a>, to collect rent payments.</p>
          <p>Before we begin linking your bank account, please agree to the terms of service.</p>
        </div>

        <div class="action">
          <button class="primary" @click="next">AGREE</button>
        </div>

        <div class="field-group">
          <div class="terms-statement">
            I agree to the Rafi Payment <a href="http://staging.payment.rafiproperties.com/terms" target="_blank">terms of use</a> and <a href="http://staging.payment.rafiproperties.com/privacy" target="_blank">privacy policy</a>, as well as the Dwolla <a href="https://www.dwolla.com/legal/tos/" target="_blank">terms of use</a> and <a href="https://www.dwolla.com/legal/privacy/" target="_blank">privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import session from '@/session'

export default {
  models: {
    user() {
      return this.$parent.$user
    }
  },
  methods: {
    async next() {
      await this.validate()
      this.$parent.next()
    },
    validate() {
      let promise = Promise.resolve()
      if (_.isEmpty(this.$user.terms_accepted)) {
        promise = session.request('users/activate/terms', {
          method: 'POST'
        })
      }
      return promise
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

// .step {
//   background-color: $color-background-default;
// }
.terms-statement {
  font-size: 0.65em;
  line-height: 1.4em;
  padding: 0 26px 26px;
  color: hsla(0,0%,100%,.66);

  a {
    color: #fff;
    text-decoration: underline;
  }
}

.action {
  button {
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>
