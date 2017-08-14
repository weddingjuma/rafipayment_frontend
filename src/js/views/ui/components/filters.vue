<template>
  <div>
    <h2>Filters</h2>
    <div class="box text-left">
      <pre>{{ query_string }}</pre>
    </div>
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-1">
        <div class="box">
          <input type="checkbox" id="filter" v-model="filter">
          <label for="filter">Show Removed</label>
        </div>
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="filter">
        <select-menu v-model="filter_key">
          <option v-for="key in filter_keys" :key="key" :value="key">{{ key }}</option>
        </select-menu>
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="filter">
        <input type="radio" id="true" name="filter" v-model="filter_value" :value="true">
        <label for="true">true</label>

        <input type="radio" id="false" name="filter" v-model="filter_value" :value="false">
        <label for="false">false</label>
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
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-1">
        <button @click="fetchNew">Fetch</button>
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
      filter_value: true,
      filter_key: 'removed',
      filter_keys: [
        'removed',
        'id'
      ],
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
      let query = {}
      if (this.filter) {
        query[`filter_${this.filter_key}`] = this.filter_value
      }
      if (this.sort) {
        query[`sort_${this.sort_key}`] = this.sort_value
      }
      return query
    }
  },
  watch: {
    query_string(value) {
      this.$router.push({
        query: value
      })
    }
  },
  methods: {
    parseQuery(query) {
      const filter = _.pickBy(query, (value, key) => {
        return key.includes('filter')
      })
      if (!_.isEmpty(filter)) {
        this.filter = true
        for (let key in filter) {
          this.filter_key = key.replace('filter_', '')
          this.filter_value = filter[key]
        }
      }
      const sort = _.pickBy(query, (value, key) => {
        return key.includes('sort')
      })
      if (!_.isEmpty(sort)) {
        this.sort = true
        for (let key in sort) {
          this.sort_key = key.replace('sort_', '')
          this.sort_value = sort[key]
        }
      }
    },
    fetchNew() {
      collection = new Collection({
        basePath: `admins${window.location.search}`
      })
      return collection.fetch()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
