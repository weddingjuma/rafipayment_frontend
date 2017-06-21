<template>
  <div class="account" v-if="loaded">
    <div v-for="model in funding_sources">
      <funding-source :data="model"></funding-source>
    </div>
    <div class="actions">
      <button @click="showModal">Add Bank +</button>
    </div>

    <funding-source-modal
      v-if="modal_visible"
      @close="closeModal"
      @complete="completeIAV">
    </funding-source-modal>

    <loading v-if="loading" />

  </div>
</template>

<script>
import session from '@/session'
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
      loaded: false,
      loading: true,
      modal_visible: false
    }
  },
  computed: {
    funding_sources() {
      const primary_id = session.primary_funding_source.id
      return this.collection.filter(model => {
        return model.type !== 'balance'
      }).sort((a, b) => {
        return (a.id === primary_id) ? -1 : 1
      })
    },
    ...mapGetters([
      'collection'
    ])
  },
  created() {
    // console.log('created');
    this.load()
  },
  methods: {
    async load() {
      await session.update()
      this.fetch()
      .then(() => {})
      .catch(() => {})
      .then(() => {
        this.loading = false
        this.loaded = true
      })
    },
    fetch() {
      return this.$store.dispatch('fetch')
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
  // watch: {
  //   funding_sources() {
  //     console.log('funding sources changed, ', this.funding_sources);
  //   }
  // },
  components: {
    fundingSource,
    fundingSourceModal
  }
}
</script>

<style scoped lang="scss">
.actions {
  margin-top: 14px;
  margin-bottom: 60px;
}
</style>
