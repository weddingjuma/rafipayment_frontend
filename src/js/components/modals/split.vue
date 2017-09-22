<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Split / Autopay</h1>
    <div slot="body" class="text-left">
      <loading v-if="loading"></loading>
      <div class="field-group">
        <legend>Split</legend>
        <currency
          v-model="split_amount"
          ref="default"
          name="amount"
          v-validate="'required'"
          @change="validateInput">
        </currency>
        <validation name="amount" :errors="errors"></validation>
      </div>
    </div>
  </modal>
</template>

<script>
import _ from 'lodash'
import { sleep, parseCurrency, Deferred } from '@/utils'
import session from '@/session'

export default {
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: false,
      split_amount: parseFloat(_.get(this.model.split, session.$user.id)),
      validated: undefined
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validateInput() {
      const deferred = new Deferred()
      const validation = this.model.validateSplit(this.split_amount)
      this.split_amount = validation.amount

      if (!validation.validated) {
        this.validated = false
        await sleep(90)
        const msg = validation.amount
          ? 'Total rent split cannot exceed total rent due'
          : 'The amount field is required'
        this.$validator.errors.add(
          'amount',
          msg,
          'required'
        )
        await sleep(300)
        this.validated = undefined
        deferred.reject()
      } else {
        this.validated = true
        deferred.resolve()
      }
      return deferred.promise
    },
    async validate() {
      const deferred = new Deferred()
      if (this.validated === false) {
        deferred.reject()
      } else if (this.validated === undefined) {
        await this.validateInput()
        await this.save()
        deferred.resolve()
      } else {
        await this.save()
        deferred.resolve()
      }
      return deferred.promise
    },
    save() {
      this.loading = true
      const split = parseCurrency(this.split_amount, Number)
      return this.model.save({
        split
      })
      .then((response) => {
        this.confirm(response)
      })
      .catch(() => {})
      .then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.currency-container {
  width: 100%;
}
</style>
