<template>
  <div class="panel small">
    <loading v-if="loading"></loading>
    <div class="box bill-detail">
      <header class="flex">
        <div class="flex-equal text-left">{{ $transfer.amount | currency }}</div>
        <div class="flex-equal text-right"><span :class="['text-color', stateClass]">{{ $transfer.status.state }}</span></div>
      </header>

      <dl class="pad text-left">
        <dt>Date</dt>
        <dd>{{ $transfer.created | moment }}</dd>
        <dt>Time</dt>
        <dd>{{ $transfer.created | moment('h:mm a') }}</dd>
        <dt>Method</dt>
        <dd>{{ $transfer.method | capitalize }} Payment</dd>
        <dt>Lease</dt>
        <dd>{{ $transfer.address | capitalize }}</dd>
        <dt>Paid To</dt>
        <dd>{{ $transfer.destination.name }}</dd>
      </dl>

      <div v-if="error" class="flag danger pad">
        ✖ {{ error }}
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import TransferModel from '@/models/transfer'

export default {
  models: {
    transfer() {
      return new TransferModel({
        id: this.$route.params.transfer_id
      }, {
        basePath: 'transfers'
      })
    }
  },
  data() {
    return {
      loading: true
    }
  },
  async created() {
    await this.$transfer.fetch()
    this.loading = false
  },
  computed: {
    error() {
      const errors = _.get(this.$transfer, 'error_data.data._embedded.errors')
      const error = _.head(errors)
      const code = _.get(error, 'code')
      let message
      if (code === 'Invalid') {
        message = 'Insufficient funds'
      } else {
        message = _.get(error, 'message')
      }
      return message
    },
    stateClass() {
      const status = this.$transfer.status.state
      return {
        success: [
          'processed'
        ].includes(status),
        neutral: [
          'pending',
          'submitted'
        ].includes(status),
        danger: [
          'failed',
          'error',
          'cancelled'
        ].includes(status)
      }
    }
  },
  methods: {
    // goToBill() {
    //   const path = this.$transfer.bill
    //   this.$router.push(`/bills/${path}`)
    // },
    cancelTransfer() {
      console.log('cancel');
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  padding: 0;
}
.pad {
  padding: 14px;
}
.flag {
  margin: 0;
}
dl {
  font-size: 0.9em;

  dt {
    width: 35%;
    margin-bottom: 5px;
  }
  dd {
    width: 65%;
    margin-bottom: 5px;
  }
}
</style>
