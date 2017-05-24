<template>
  <div class="panel small">
    <div v-for="model in collection">
      <lease :data="model"></lease>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import Collection from '@/store/collection'

import lease from '@/components/cards/lease'

const store = new Collection({
  basePath() {
    const activation = localStorage.getItem('activation_token')
    const path = activation ? 'tenants/activate' : 'account/leases'
    return path
  }
})

export default {
  store,
  name: 'leases',
  collection: true,
  computed: {
    ...mapGetters([
      'collection'
    ])
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetch')
    }
  },
  components: {
    lease
  }
}
</script>
