<template>
  <div class="box funding_source">
    <header>
      <h3>{{ $funding_source.name }} <span class="flag success" v-show="$funding_source.is_primary">PRIMARY</span></h3>
    </header>
    <div class="content">
      <dl class="details">
        <dt>Added:</dt>
        <dd>{{ $funding_source.created | moment('MM/DD/YYYY') }}</dd>
        <dt>Status:</dt>
        <dd :class="['text-color', status_class_handler]">{{ $funding_source.status }}</dd>
      </dl>
    </div>
    <div class="actions" v-show="!$funding_source.is_primary">
      <button class="small" @click="promptPrimary">Make primary</button>
      <button class="danger small" @click="promptDelete">Remove</button>
    </div>
  </div>
</template>

<script>
import app from '@/app'
import FundingSourceModel from '@/models/funding_source'

export default {
  name: 'funding_source',
  props: {
    data: Object
  },
  models: {
    funding_source() {
      return new FundingSourceModel(this.data)
    }
  },
  computed: {
    status_class_handler() {
      return {
        danger: this.$funding_source.status === 'unverified',
        warning: this.$funding_source.status === 'added',
        success: this.$funding_source.status === 'verified'
      }
    }
  },
  methods: {
    promptDelete() {
      app.confirm(
        `Are you sure you want to remove your bank account "${this.$funding_source.name}"?`,
        this.confirmDelete,
        'Confirm Delete',
        ['Delete', 'Cancel']
      )
    },
    promptPrimary() {
      app.confirm(
        `Are you sure you want to make "${this.$funding_source.name}" your new primary bank account?`,
        this.confirmPrimary,
        'Confirm New Primary'
      )
    },
    confirmPrimary() {
      app.$store.dispatch('loading_begin')
      this.$funding_source.makePrimary()
      .then(() => {
        app.$store.dispatch('set_primary_funding_source', this.$funding_source.$data)
      })
      .catch(() => {})
      .then(() => {
        app.$store.dispatch('loading_end')
      })
    },
    confirmDelete() {
      app.$store.dispatch('loading_begin')

      this.$store.dispatch('delete', this.$funding_source.id)
      .catch(() => {})
      .then(() => {
        app.$store.dispatch('loading_end')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.box {
  padding: 0;
  text-align: left;
}
h3 {
  margin: 0;
  font-size: 1.1em;
  font-weight: 400;
  text-transform: capitalize;
}
.content {
  padding: 4px 14px 14px 14px;
}
.details {
  font-size: 0.8em;
}
.actions {
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
}
.flag.success {
  margin-left: 8px;
  font-size: 0.7em;
  font-weight: bold;
}
// .primary {
//   margin-left: 8px;
//   padding: 8px;
//   color: $color-text-light;
//   background: $color-status-success;
//   border-radius: 3px;
//   font-size: 0.8em;
//   font-weight: bold;
// }
</style>
