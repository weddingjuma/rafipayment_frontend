<template>
  <div class="panel small">
    <div v-if="collection.length" class="collection">
      <bill :data="model" v-for="model in collection" :key="model.id"></bill>
    </div>
    <div class="centered" v-else-if="loaded">
      <icon-success></icon-success>
      <div class="message">You have no current bills.<br />Lucky you!</div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from '@/plugins/collection'

import bill from '@/components/cards/bills/large'
import model from '@/models/bill'

export default {
  name: 'current-bills',
  collection() {
    return new Collection({
      model,
      basePath: 'account/bills/active',
      sortBy: 'due_date',
      reverse: true
    })
  },
  data() {
    return {
      loaded: false
    }
  },
  async created() {
    await this.fetch()
    this.loaded = true
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
    }
  },
  components: {
    bill
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.collection {
  margin-bottom: 60px;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.message {
  line-height: 1.4em;
}
</style>
