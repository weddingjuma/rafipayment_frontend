<template>
  <div class="box funding_source">
    <header>
      <h3>
        <span class="name">{{ $funding_source.name }}</span>
        <span class="flag success" v-show="$funding_source.is_primary">PRIMARY</span>
      </h3>
    </header>
    <div class="content">
      <dl class="details">
        <dt v-if="$funding_source.bankName">Bank</dt>
        <dd v-if="$funding_source.bankName">{{ $funding_source.bankName }}</dd>
        <dt>Added</dt>
        <dd>{{ $funding_source.created | moment('MMMM DD, YYYY') }}</dd>
        <dt>Status</dt>
        <dd :class="['text-color', status_class_handler]">{{ $funding_source.$status }}</dd>
      </dl>
    </div>

    <div class="divider"></div>

    <div class="message" v-if="$funding_source.$status !== 'verified'">
      <div class="pad">

        <div v-if="['microdeposits pending', 'microdeposits added'].includes($funding_source.$status)">
          <p>Microposits will be deposited in your bank account shortly. Please note the amounts before returning here to verify the account.</p>
          <div class="text-right">
            <a href="http://payment.rafiproperties.com/help/#microdeposits" target="_blank">More info <icon-external></icon-external></a>
          </div>
        </div>

        <div v-else-if="$funding_source.$status === 'microdeposits completed'">
          <p>Please enter the amounts of the microdeposits from your bank statement.</p>
          <button type="button" @click="modal_visible = true">Verify Microdeposits</button>

          <modal-microdeposits @close="modal_visible = false" @confirm="update" :model="$funding_source" v-if="modal_visible"></modal-microdeposits>

        </div>
      </div>
      <div class="divider"></div>
    </div>

    <div class="actions">
      <button :disabled="$funding_source.is_primary" class="small" @click="promptPrimary">Make primary</button>
      <button :disabled="$funding_source.is_primary" class="danger small" @click="promptDelete">Remove</button>
    </div>
  </div>
</template>

<script>
import app from '@/app'
import session from '@/session'
import FundingSourceModel from '@/models/funding_source'
import modalMicrodeposits from '@/components/modals/microdeposits'

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
  data() {
    return {
      modal_visible: false
    }
  },
  computed: {
    status_class_handler() {
      return {
        danger: [
          'unverified',
          'microdeposits failed',
          'microdeposits maxattempts'
        ].includes(this.$funding_source.$status),
        warning: [
          'added',
          'microdeposits pending',
          'microdeposits added',
          'microdeposits completed'
        ].includes(this.$funding_source.$status),
        success: [
          'verified'
        ].includes(this.$funding_source.$status)
      }
    }
  },
  methods: {
    async update() {
      await session.loadSession()
      this.$store.dispatch('fetch')
    },
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
        app.$store.dispatch('set_primary_funding_source', this.$funding_source.toJSON())
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
  },
  watch: {
    data(data) {
      this.$funding_source = data
    }
  },
  components: {
    modalMicrodeposits
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
  font-size: 0.75em;
}
.message {
  font-size: 0.8em;
}
.actions {
  padding: 10px;
  // border-top: 1px solid #ccc;
  text-align: right;
}
span.name {
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 4px;
}
.flag.success {
  // margin-left: 8px;
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
