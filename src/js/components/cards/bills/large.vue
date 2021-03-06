<template>
  <div class="box bill">
    <loading v-if="loading"></loading>
    <div @click="showDetails">
      <header>
        <div class="table full-width">
          <div class="table-row">
            <div class="table-cell text-left">
              <div class="label">{{ $bill.label }}</div>
            </div>
            <div class="table-cell text-right">
              <span :class="['text-color', message_class]">{{ $bill.message }}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="content">
        <legend>BALANCE</legend>
        <h1>{{ $bill.better_display_balance | currency }}</h1>
      </div>
    </div>

    <footer class="button button-full" v-if="$bill.bill_status !== 'paid'" @click="showModal">Make a Payment</footer>

    <transfer-modal
      v-if="modal_visible"
      @close="closeModal"
      :confirm="updateBill"
      :model="$bill">
    </transfer-modal>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import session from '@/session'
import BillModel from '@/models/bill'
import transferModal from '@/components/modals/transfer'

import validateFundingSourceStatus from '@/utils/validateFundingSourceStatus'

export default {
  name: 'bill-large',
  props: {
    data: Object
  },
  data() {
    return {
      loading: false,
      modal_visible: false
    }
  },
  models: {
    bill() {
      return new BillModel(this.data, {
        basePath: 'account/bills'
      })
    }
  },
  computed: {
    message_class() {
      const status = this.$bill.bill_status
      return {
        success: [
          'paid'
        ].includes(status),
        neutral: [
          'future',
          'due'
        ].includes(status),
        danger: [
          'overdue'
        ].includes(status)
      }
    },
    primary_funding_source() {
      return session.primary_funding_source
    }
  },
  methods: {
    showDetails() {
      this.$router.push(`/bills/${this.$bill.id}`)
    },
    showModal() {
      app.$store.dispatch('loading_begin')
      this.$become('primary_funding_source')
      .then((funding_source) => {
        if (validateFundingSourceStatus(funding_source)) {
          this.modal_visible = true
        }
      })
      .catch(() => {})
      .then(() => {
        app.$store.dispatch('loading_end')
      })
    },
    closeModal() {
      this.modal_visible = false
    },
    async updateBill(response) {
      this.$bill.transfers = response.transfers
      this.$router.push(`/bills/${this.$bill.id}`)
    }
  },
  components: {
    transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.bill {
  padding: 0;

  &:hover {
    cursor: pointer;
  }
}

.content {
  padding: 20px;

  .label {
    font-size: 0.75em;
  }

  legend {
    display: block;
    width: 100%;
    margin-bottom: 2px;
    text-align: center;
    font-size: 0.7em;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 400;
  }

  .message {
    font-size: 0.85em;

    span {
      font-weight: bold;
      margin-right: 6px;
    }
  }
}
.label {
  text-transform: uppercase;
}
</style>
