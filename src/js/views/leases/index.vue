<template>
  <div class="panel small">
    <div v-for="model in collection">
      <lease :data="model"></lease>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from '@/plugins/collection'
import lease from '@/components/cards/lease'

export default {
  name: 'leases',
  collection() {
    return new Collection({
      basePath: 'account/leases'
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
    }
  },
  components: {
    lease
  }
}
</script>
