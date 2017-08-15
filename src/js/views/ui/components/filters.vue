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
        <div class="box">
          <input type="checkbox" id="paginate" v-model="paginate">
          <label for="paginate">Paginate</label>
        </div>
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="paginate">
        <legend>Skip</legend>
        <number v-model="paginator_skip" name="paginator skip" :wrap="false" />
      </div>
      <div class="field-group grid__col grid__col--1-of-2" v-if="paginate">
        <legend>Limit</legend>
        <number v-model="paginator_limit" name="paginator limit" :wrap="false" />
      </div>
    </div>

    <div class="box text-left">
      <pre>{{ query_string }}</pre>
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
      query_modifiers: ['filter', 'sort'],
      paginator_keys: ['limit', 'skip'],
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
      ],
      paginate: false,
      paginator_limit: 1,
      paginator_skip: 0
    }
  },
  computed: {
    query_string() {
      let query = {}
      this.query_modifiers.forEach(modifier => {
        if (this[modifier]) {
          const key = `${modifier}_${this[`${modifier}_key`]}`
          query[key] = this[`${modifier}_value`]
        }
      })
      this.paginator_keys.forEach(prop => {
        if (this.paginate) {
          const key = `paginator_${prop}`
          query[key] = this[key]
        }
      })
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
      this.query_modifiers.forEach(modifier => {
        this.setQuery(modifier, query)
      })
      this.paginator_keys.forEach(key => {
        this.setPagination(key, query)
      })
    },
    setQuery(modifier, query) {
      const match = _.pickBy(query, (value, key) => {
        return key.includes(modifier)
      })
      if (!_.isEmpty(match)) {
        this[modifier] = true
        for (let key in match) {
          this[`${modifier}_key`] = key.replace(`${modifier}_`, '')
          this[`${modifier}_value`] = match[key]
        }
      }
    },
    setPagination(key, query) {
      const full_key = `paginator_${key}`
      const query_value = query[full_key]
      if (query_value) {
        this.paginate = true
        this[full_key] = query_value
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
