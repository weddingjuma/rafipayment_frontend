<template>
  <div class="account" v-if="loaded">
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
// import _ from 'lodash'
// import app from '@/app'
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
      modal_visible: false
    }
  },
  computed: {
    funding_sources() {
      // const primary_id = _.get(app.$store.getters, 'session:primary_funding_source.id')
      // console.log(session.primary_funding_source);
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
    this.fetch()
    .then(() => {})
    .catch(() => {})
    .then(() => {
      this.loaded = true
    })
  },
  methods: {
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
  components: {
    fundingSource,
    fundingSourceModal
  }
}
</script>
