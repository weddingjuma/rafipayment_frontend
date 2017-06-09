<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Make a Payment</h1>
    <div slot="body" class="modal-transfer">

      <loading v-if="loading"></loading>
      <div class="field-group">
        <legend>Amount</legend>
        <currency
          ref="default"
          v-model="transfer_amount"
          v-validate.disable="'required|min_currency:0.01|max_currency:5000'" />
        <validation name="amount" :errors="errors"></validation>
      </div>
      <div class="message">
        {{ transfer_disclaimer }}
      </div>

    </div>
  </modal>
</template>

<script>
import _ from 'lodash'
import app from '@/app'
import session from '@/session'

import { mapGetters } from 'vuex'

export default {
  store: app.$store,
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: true,
      transfer_amount: null
    }
  },
  async created() {
    this.transfer_amount = this.getSuggestion()
    const val = await this.$become('primary_funding_source')
    if (val) this.loading = false
  },
  computed: {
    transfer_disclaimer() {
      const source = _.get(this.primary_funding_source, 'name')
      const destination = _.get(session.$user, 'company.name')
      const message = `Funds will be transferred from your account "${source}"
                       to ${destination}`
      return this.loading ? '...' : message
    },
    ...mapGetters({
      primary_funding_source: 'session:primary_funding_source'
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getSuggestion() {
      console.log(this.model.lease);
      console.log(_.get(this.model.lease.split, session.$user.id));
      return this.model.type === 'monthly'
      ? _.get(this.model.lease.split, session.$user.id)
      : this.model.better_display_balance
    },
    async validate() {
      await this.$validator.validateAll()
      await this.confirmPayment()
    },
    async confirmPayment() {
      const amount = this.transfer_amount
      return this.model.save({
        amount
      })
      .then((response) => {
        const callback = () => {
          return this.confirm(response)
        }
        app.alert(
          'Thank you, your payment is processing',
          callback,
          'Payment Successful'
        )
      })
      .catch(() => {
        app.alert(
          'You have exceeded your weekly transfer limit, please wait until next Monday before trying again',
          null,
          'Over Weekly Limit'
        )
      })
    }
  }
}
</script>

<style lang="scss">
.modal-transfer {
  .field-group {
    .currency-container {
      display: block;

      input {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.message {
  font-size: 0.85em;
  line-height: 1.25em;
}
</style>
