<template>
  <div class="step">
    <div class="panel small">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99">
          <path d="M147.33,85.89H43.16l0.16-9.16,51-32.94,53,32.91v9.18Zm-87.65-9h70.88L94.46,54.45Z" transform="translate(-3 -3)"/>
          <rect x="124.87" y="89.49" width="9" height="29.03"/>
          <rect x="48.94" y="88.4" width="9" height="30.12"/>
          <rect x="74.25" y="88.4" width="9" height="30.12"/>
          <rect x="99.56" y="88.4" width="9" height="30.12"/>
          <rect x="39.34" y="123.63" width="105.31" height="9"/>
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)"/>
        </svg>
      </div>

      <loading v-if="loading"></loading>
      <dwolla-iav @load="loading = false" @complete="waitForNext" v-if="!step.value"></dwolla-iav>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import session from '@/session'
import { sleep } from '@/utils'
import dwollaIav from '@/components/dwolla_iav'

export default {
  name: 'dwolla-bank',
  props: {
    step: Object
  },
  data() {
    return {
      loading: !this.step.value
    }
  },
  created() {
    if (this.step.value) this.$parent.next()
  },
  methods: {
    async waitForNext() {
      this.loading = true
      // this is the same endpoint we just posted to, so we have to wait over
      // 1000ms or risk getting throttled
      await sleep(1200)
      const token = _.get(this.$route.query, 'token')
      await session.loadActivation(token)
      session.fetchFundingSources()
      await sleep(3000)
      this.loading = false
      this.$parent.next()
    }
  },
  components: {
    dwollaIav
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// @import '~%/colors';

// .step {
  // background: rgb(25, 158, 134);
  // background-color: $color-background-default;
// }
</style>
