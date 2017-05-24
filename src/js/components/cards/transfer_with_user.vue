<template>
  <div class="box table transfer">
    <div class="table-row">
      <avatar class="table-cell" :initials="$user.initials" :color="$user.avatar_color"></avatar>
      <div class="table-cell pad-left text-left details">
        <h5>{{ $user.full_name }}</h5>
      </div>
      <div class="table-cell pad-left pad-right text-right" style="width: 140px">
        <span :class="['flag', stateClass]">{{ data.status.state }}</span>
        <div class="strong">{{ data.method | replace('_', '-') }}</div>
      </div>
      <div :class="['table-cell', 'amount', 'flag', stateClass]">
        {{ data.amount | currency }}
      </div>
    </div>
  </div>
</template>

<script>
import Model from '@/models/user'

export default {
  name: 'transfer-card',
  props: {
    data: Object
  },
  created() {
    this.$options.model = new Model(this.data.user)
  },
  computed: {
    $user: {
      get() {
        return this.$options.model
      },
      set(data) {
        return this.$options.model.set(data)
      }
    },
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
  }
}
</script>

<style scoped lang="scss">
.transfer {
  margin: 10px;
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
  width: 100px;
}
.flex-cell {
  margin-left: 10px;
}
</style>
