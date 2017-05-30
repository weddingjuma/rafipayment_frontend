<template>
  <div class="panel small">
    <div class="box bill-detail" v-if="loaded">
      <header class="flex">
        <div class="flex-equal" style="text-transform:uppercase">Due Date: {{ $bill.due_date | moment('MM/DD/YYYY') }}</div>
        <!-- <div class="flex-equal text-right">Bill #{{ $bill.identifier }}</div> -->
      </header>

      <dl class="pad flex" v-for="charge in $bill.charges.recurring">
        <dt>
          <div>{{ $bill.processType(charge.type) | replace('_') | capitalize }}</div>
          <div class="description">{{ charge.description }}</div>
        </dt>
        <dd>{{ charge.amount | currency }}</dd>
      </dl>

      <dl class="pad flex" v-for="charge in $bill.charges.scheduled">
        <dt>
          <div>{{ $bill.processType(charge.type) | replace('_') | capitalize }}</div>
          <div class="description">{{ charge.description }}</div>
        </dt>
        <dd>{{ charge.amount | currency }}</dd>
      </dl>

      <div class="divider"></div>

      <dl class="pad flex">
        <dt>Total</dt>
        <dd>{{ $bill.total | currency }}</dd>
      </dl>

      <div class="divider"></div>

      <dl class="pad flex">
        <dt>Remaining Balance</dt>
        <dd class="strong">{{ $bill.better_display_balance | currency }}</dd>
      </dl>

      <div class="pad flex">{{ payments_header | uppercase }}</div>

      <div v-for="tenant in $bill.tenants">
        <transfers-by-user-card :user="tenant" :transfers="$bill.transfers_by_user[tenant._id]"></transfers-by-user-card>
      </div>

      <footer
        class="button button-full"
        v-if="$bill.bill_status !== 'paid'"
        @click="showModal">
        Make a Payment
      </footer>

    </div>

    <transfer-modal v-if="modal_visible" @close="closeModal" :confirm="updateBill" :model="$bill"></transfer-modal>
    <loading v-if="loading"></loading>

  </div>

</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import session from '@/session'
import BillModel from '@/models/bill'

import validateFundingSourceStatus from '@/utils/validateFundingSourceStatus'

import transfersByUserCard from '@/components/cards/transfers_by_user'
import transferModal from '@/components/modals/transfer'

export default {
  name: 'bill',
  models: {
    bill() {
      return new BillModel({
        id: this.$route.params.id
      }, {
        basePath: 'account/bills'
      })
    }
  },
  created() {
    this.$bill.fetch()
    .then((res) => {
      // inject back route
      const active = _.get(res, 'status.active')
      const page = active ? 'current' : 'past'
      const path = `/dashboard/${page}`
      this.$route.meta.back = path
    })
    .catch(() => {})
    .then(() => {
      this.loading = false
      this.loaded = true
    })
  },
  data() {
    return {
      loaded: false,
      loading: true,
      modal_visible: false
    }
  },
  computed: {
    message_class() {
      const status = this.$bill.bill_status
      return {
        success: status === 'paid',
        neutral: ['future', 'due'].includes(status),
        danger: status === 'overdue'
      }
    },
    payments_header() {
      let output = 'payments made'
      if (!this.$bill.transfers.length) output = `no payments made`
      return output
    },
    primary_funding_source() {
      return session.primary_funding_source
    }
  },
  methods: {
    async showModal() {
      this.$store.dispatch('loading_begin')
      this.$become('primary_funding_source')
      .then((funding_source) => {
        if (validateFundingSourceStatus(funding_source)) {
          this.modal_visible = true
        }
      })
      .catch(() => {})
      .then(() => {
        this.$store.dispatch('loading_end')
      })
    },
    closeModal() {
      this.modal_visible = false
    },
    updateBill(response) {
      this.$bill.transfers = response.transfers
    }
  },
  components: {
    transfersByUserCard,
    transferModal
  }
}
</script>

<style lang="scss">
.bill-detail {
  .user {
    .avatar {
      width: 30%
    }
  }
}
</style>

<style scoped lang="scss">
@import '~%/colors';

.box {
  padding: 0;
  min-height: calc(100vh - 120px);
}
.pad {
  padding: 14px;
}
.description {
  font-size: 0.85em;
  font-weight: normal;
  line-height: 2em;
}
dl {
  dt {
    font-weight: normal;
  }
}
.button-full {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
