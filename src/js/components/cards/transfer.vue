<template>
  <div class="box table transfer" @click="goToTransfer">
    <div class="table-row">
      <div class="table-cell pad-left text-left">
        <div>{{ data.created | moment('MM/DD/YY, h:mm A') }}</div>
        <div>{{ data.method | replace('_', '-') }}</div>
      </div>
      <!-- <div class="table-cell text-center">
        <div class="strong">{{ data.method | replace('_', '-') }}</div>
      </div> -->
      <!-- <div class="table-cell pad-left pad-right text-right">
        <span :class="['flag', stateClass]">{{ data.status.state }}</span>
      </div> -->
      <div :class="['table-cell', 'amount', 'text-right']">
        <div>{{ data.amount | currency }}</div>
        <span :class="['text-color', stateClass]">{{ data.status.state }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Model from '@/models/user'

export default {
  name: 'transfer-card',
  props: {
    data: Object
  },
  computed: {
    stateClass() {
      const status = this.data.status.state
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
    goToTransfer() {
      const current = this.$route.path
      const bill_id = this.data.bill
      const path = `/bills/${bill_id}/transfers/${this.data._id}`
      this.$router.push(path, () => {
        this.$route.meta.back = current
      })
    }
  }
}
</script>

<style scoped lang="scss">
.transfer {
  // margin: 10px;
  width: 100%;
  margin-bottom: 3px;
  padding: 0;
  font-size: 0.7rem;

  .details {
    padding: 10px 20px;
  }

  h5 {
    margin-bottom: 5px;
    // font-weight: bold;
  }

  .avatar {
    display: table-cell;
    width: 20%;
  }

  .pad-left {
    padding-left: 20px;
  }

  .pad-right {
    padding-right: 20px;
  }
}
.flag {
  margin-right: 0;
  margin-bottom: 6px;
}
.amount {
  padding: 20px;
  // width: 100px;
}
.flex-cell {
  margin-left: 10px;
}
</style>
