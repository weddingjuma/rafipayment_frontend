<template>
  <div class="box table bill">
    <div class="table-row" @click="showDetails">
      <div class="table-cell">{{ $bill.due_date | moment('MMM YYYY') }}</div>
      <div class="table-cell">{{ $bill.target }}</div>
      <div class="table-cell status">
        <span :class="['flag', flag_class]">{{ bill_total }}</span> {{  }}
      </div>
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { prettyCurrency } from '@/utils'
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
    bill_total() {
      const bill_total = this.$bill.total ? prettyCurrency(this.$bill.total) : 'Pre-Paid';
      return bill_total
    },
    flag_class() {
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
      this.$router.push(`/bills/${this.$bill.id}`)
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.bill {
  width: 100%;
  padding: 0;
  font-size: 0.9em;

  &:hover {
    cursor: pointer;
  }
}

.table-cell {
  padding: 12px;
}

.status {
  padding: 0;
  width: 100px;

  span {
    display: block;
    padding: 20px;
    margin-right: 0;
    border-radius: 0;
  }
}

.label {
  text-transform: uppercase;
}
</style>
