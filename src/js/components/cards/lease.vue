<template>
  <div class="box lease" @click="showDetails">
    <h3>{{ $lease.address }}</h3>
    <ul class="details">
      <li>{{ $lease.start_date | moment('l') }} – {{ $lease.end_date | moment('l') }}</li>
      <li>{{ $lease.rent | currency }}/month</li>
    </ul>
  </div>
</template>

<script>
import Model from '@/models/lease'

export default {
  name: 'lease',
  props: {
    data: Object
  },
  created() {
    this.$options.model = new Model(this.data)
    // console.log(this.$lease.toJSON());
  },
  computed: {
    $lease: {
      get() {
        return this.$options.model
      },
      set(data) {
        this.$options.model.set(data)
      }
    }
  },
  methods: {
    showDetails() {
      this.$router.push(`/leases/${this.$lease.id}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.lease {
  border-left: 5px solid $color-highlight;
  // color: #333;
  text-align: left;
}
.details {
  margin: 0;
  font-size: 0.8em;

  li {
    margin-top: 6px;
    margin-bottom: 0;
  }
}
</style>
