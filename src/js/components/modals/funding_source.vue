<template>
  <modal @close="close">
    <h1 slot="header">Add Bank Account</h1>
    <div slot="body">
      <loading v-if="loading"></loading>
      <dwolla-iav @load="loading = false" @complete="waitAndClose"></dwolla-iav>
    </div>
  </modal>
</template>

<script>
import { sleep } from '@/utils'
import dwollaIav from '@/components/dwolla_iav'

export default {
  props: {
    confirm: Function
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async waitAndClose() {
      this.loading = true
      await sleep(4000)
      this.loading = false
      this.$emit('complete')
      this.close()
    }
  },
  components: {
    dwollaIav
  }
}
</script>
