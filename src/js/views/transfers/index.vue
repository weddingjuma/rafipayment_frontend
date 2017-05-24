<template>
  <div>
    <div v-for="model in collection">
      <transfer-card :data="model"></transfer-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Collection from '@/store/collection'

import transferCard from '@/components/cards/transfer'

const store = new Collection({
  basePath: 'account/transfers',
  sortBy: 'created',
  reverse: true
})

export default {
  store,
  created() {
    this.$store.dispatch('fetch')
  },
  computed: {
    ...mapGetters([
      'collection'
    ])
  },
  components: {
    transferCard
  }
}
</script>
