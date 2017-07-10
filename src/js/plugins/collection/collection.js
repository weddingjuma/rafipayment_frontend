import Vue from 'vue'
import { mapGetters } from 'vuex'
import _store from './store'
import { Model } from '@/plugins/model'

export default class Collection {
  constructor({
    model = Model,
    id_attribute = '_id',
    basePath = '',
    createPath = '',
    reverse = false,
    sortBy = false
  }) {
    const store = _store(
      model,
      id_attribute,
      basePath,
      createPath,
      reverse,
      sortBy
    )
    return new Vue({
      name: 'collection',
      store,
      computed: {
        ...mapGetters([
          'collection'
        ])
      },
      methods: {
        fetch() {
          return this.$store.dispatch('fetch')
        },
        reset() {
          return this.$store.dispatch('reset')
        },
        add(model) {
          return this.$store.dispatch('add', model)
        },
        delete(id) {
          return this.$store.dispatch('delete', id)
        }
      }
    })
  }
}
