<template>
  <div class="account">
    <div v-for="model in funding_sources">
      <funding-source :data="model"></funding-source>
    </div>
    <button @click="showModal">Add Bank +</button>

    <funding-source-modal
      v-if="modal_visible"
      @close="closeModal"
      @complete="completeIAV">
    </funding-source-modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fundingSource from '@/components/cards/funding_source'
import fundingSourceModal from '@/components/modals/funding_source'
import Collection from '@/store/collection'

const store = new Collection({
  basePath: 'account/funding_sources'
})

export default {
  store,
  collection: true,
  data() {
    return {
      modal_visible: false
    }
  },
  computed: {
    funding_sources() {
      return this.collection.filter(model => {
        return model.type !== 'balance'
      })
    },
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
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    completeIAV() {
      this.closeModal()
      this.fetch()
    }
  },
  components: {
    fundingSource,
    fundingSourceModal
  }
}
</script>
