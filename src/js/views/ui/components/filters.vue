<template>
  <div>
    <h2>Filters</h2>
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-1">
        <div class="box">
          <input type="checkbox" id="filter" v-model="filter">
          <label for="filter">Show Removed</label>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-1">
        <div class="box">
          <input type="checkbox" id="sort" v-model="sort">
          <label for="sort">Sort</label>
        </div>
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="sort">
        <select-menu v-model="sort_key">
          <option v-for="key in sort_keys" :key="key" :value="key">{{ key }}</option>
        </select-menu>
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="sort">
        <input type="radio" id="asc" name="order" v-model="sort_value" value="1">
        <label for="asc">Asc</label>

        <input type="radio" id="desc" name="order" v-model="sort_value" value="-1">
        <label for="desc">Desc</label>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Collection } from '@/plugins/collection'

let collection

export default {
  name: 'filters',
  created() {
    const query = this.$router.currentRoute.query
    if (!_.isEmpty(query)) {
      this.parseQuery(query)
    }
  },
  data() {
    return {
      filter: false,
      filter_key: 'removed',
      sort: false,
      sort_value: '1',
      sort_key: 'created',
      sort_keys: [
        'created',
        'updated'
      ]
    }
  },
  computed: {
    query_string() {
      let query = ''
      if (this.filter) {
        query += `&filter_${this.filter_key}=true`
      }
      if (this.sort) {
        query += `&sort_${this.sort_key}=${this.sort_value}`
      }
      return query
    }
  },
  watch: {
    filter(value) {
      console.log(value)
    },
    query_string(value) {
      console.log('querystring changed', value);
    }
  },
  methods: {
    parseQuery(query) {
      console.log(query);
    },
    modifiersChanged() {
      collection = new Collection({
        basePath: `admins${this.query_string}`
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
