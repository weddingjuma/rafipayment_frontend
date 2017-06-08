<template>
  <div class="step">
    <div class="panel small">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99">
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)"></path>
          <path d="M95.18,47.45L139.66,92.1h-9.6V128H106.9V109.72H83.47V128H60.31V92.1h-8L95.18,47.45M95.06,34.58l-6.37,6.64L45.85,85.86,31.23,101.1H51.31V137H92.47V118.72H97.9V137h41.16V101.1h22.27L146,85.74,101.56,41.1l-6.5-6.52h0Z" transform="translate(-3 -3)"></path>
        </svg>
      </div>

      <div class="form-model">
      	<h1>Your Lease</h1>

      	<div class="field-group">
      	  <h2>{{ lease.property.address }}</h2>
      	  <h2>{{ lease.start_date | moment }} – {{ lease.end_date | moment }}</h2>
      	</div>

      	<div class="field-group">
      	  <legend>Monthly Rent</legend>
      	  <h2>{{ lease.rent | currency }}</h2>
      	</div>

      	<div class="field-group">
      	  <legend>Fees Collected</legend>
          <h2>
            <span v-for="(fee, index) in fees_collected" class="nofold">
              <span>{{ fee }}<span v-if="index !== fees_collected.length-1">,&nbsp;</span></span>
            </span>
          </h2>
      	</div>

      	<div class="field-group" v-if="this.roommates.length">
      	  <legend>Your Roommates</legend>
      	  <h2>
            <span v-for="(roommate, index) in roommates" class="nofold">
              {{ roommate }}<span v-if="index !== roommates.length-1">,&nbsp;</span>
            </span>
          </h2>
      	</div>

      	<div class="action">
      	  <button class="primary" @click="next">Confirm</button>
      	</div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  props: {
    step: Object
  },
  computed: {
    lease() {
      return this.step.lease
    },
    fees_collected() {
      const has_first = this.lease.charges.scheduled.some((charge) => {
        return charge.type === 'first_month'
      })
      const has_last = this.lease.charges.scheduled.some((charge) => {
        return charge.type === 'last_month'
      })

      let fees = []

      if (has_first) fees.push('First Month')
      if (has_last) fees.push('Last Month')

      if (fees.length === 0) fees.push('None')
      return fees
    },
    roommates() {
      return this.lease.tenants.filter((tenant) => {
        if (tenant._id === this.$parent.$user.id) return
        return true
      }).map((tenant) => {
        return `${tenant.first_name} ${tenant.last_name}`
      })
    }
  },
  methods: {
    next() {
      this.$parent.next()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

legend {
  margin: 0 auto 10px;
}
.nofold {
  display: inline-block;
  white-space: nowrap;
}
.field-group {
  text-align: center;
}
</style>
