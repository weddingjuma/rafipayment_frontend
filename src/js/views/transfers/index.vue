<template>
  <div>
    <div v-for="model in collection">
      <transfer-card :data="model"></transfer-card>
    </div>
  </div>
</template>

<script>
import { Collection } from '@/plugins/collection'
import transferCard from '@/components/cards/transfer'

export default {
  collection() {
    return new Collection({
      basePath: 'account/transfers',
      sortBy: 'created',
      reverse: true
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
    transferCard
  }
}
</script>
