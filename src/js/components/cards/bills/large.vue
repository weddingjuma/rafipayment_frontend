<template>
  <div class="box bill">
    <loading v-if="loading"></loading>
    <div @click="showDetails">
      <header>
        <div class="table" style="width:100%">
          <div class="table-row">
            <div class="table-cell text-left">
              <div class="label">{{ $bill.label }}</div>

            </div>
            <div class="table-cell text-right">
              <span :class="['text-color', message_class]">{{ $bill.message }}</span>
              <!-- <div style="font-size: 0.8em">{{ $bill.display_date | moment('MM/DD/YYYY') }}</div> -->
            </div>
          </div>
        </div>

      </header>
      <div class="content">
        <legend>BALANCE</legend>
        <h1>{{ $bill.better_display_balance | currency }}</h1>
        <!-- {{ $bill.id }} -->
        <!-- <div class="message">

        </div> -->
      </div>
    </div>

    <footer class="button button-full" v-if="$bill.bill_status !== 'paid'" @click="showModal">Make a Payment</footer>

    <transfer-modal v-if="modal_visible" @close="closeModal" :confirm="updateBill" :model="$bill"></transfer-modal>
    <!-- <transfer-modal
      v-if="modal_visible"
      :close="closeModal"
      :confirm="updateBill"
      :model="$bill">
    </transfer-modal> -->

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import transferModal from '@/components/modals/transfer'
import Model from '@/models/bill'

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
  created() {
    this.$options.model = new Model(this.data, {
      basePath: 'account/bills'
    })
  },
  computed: {
    $bill: {
      get() {
        return this.$options.model
      },
      set(data) {
        this.$options.model.set(data)
      }
    },
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
    }
  },
  methods: {
    showDetails() {
      // console.log(this.$bill.decode())
      this.$router.push(`/bills/${this.$bill.id}`)
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    async updateBill(response) {
      // this.loading = true
      this.$bill.transfers = response.transfers
      // this.loading = false
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
  // color: #6a7888;
  // background: #e1e9ec;
  // border-top-left-radius: 6px;
  // border-top-right-radius: 6px;
  // box-shadow: inset -1px 3px 0 -2px hsla(0,0%,100%,.6);

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
